import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { TYSdk, Slider, Stepper, Popup } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHandPointUp,
  faChartBar,
  faTasks,
  faCog,
  faPowerOff,
  faStopwatch20,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;

const { Zone: ZoneCode, SetTemperature: SetTemperatureCode } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const mode = Strings.getLang('mode');
const ttimer = Strings.getLang('ttimer');
const programmmode = Strings.getLang('programmmode');
const programmtimermode = Strings.getLang('programmtimermode');
const manualmode = Strings.getLang('manualmode');
const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');

// определение массива данных с переводом
const set = new Set([manualmode, programmmode, programmtimermode]);
Array.from(set);

// разбор массива и вывод списка и селектора
const tabModes = Array.from(set).map(v => {
  return { key: `${v}`, title: `${v}`, value: `${v}` };
});

class Zone1 extends React.PureComponent {
  static propTypes = {
    Zone: PropTypes.string,
    SetTemperature: PropTypes.string,
  };

  static defaultProps = {
    Zone: '010101',
    SetTemperature: '1E1E141414',
  };

  constructor(props) {
    super(props);
    this.stateCM = { isHidden: true };
    this.stateC = { isHidden: true };
    this.statePower = { isHidden: false };
    this.stateTimerOn = { isHidden: false };
    this.state = { listValue: manualmode };

    this.state = { countdown: 60, countdownSwitchValue: true };

    const { SetTemperature } = this.props;
    const T = SetTemperature.substring(4, 6);
    const V = parseInt(T, 16);
    this.state = { valueZ1: V > 100 ? V - 256 : V };
  }

  // уйнкция выбора режима
  onPressMode = () => {
    Popup.list({
      type: 'radio',
      maxItemNum: 3,
      dataSource: tabModes, // сорцы для данных - можно вставить state из массива прям сюда
      iconTintColor: '#ffb700',
      title: [mode],
      cancelText,
      confirmText,
      showBack: false,
      onBack: ({ close }) => {
        console.log('Select climate --none');
        close();
      },
      value: this.state.listValue,
      footerType: 'singleCancel',
      onMaskPress: ({ close }) => {
        close();
      },
      // выбор и сохранение значения из списка по нажатию
      onSelect: (value, { close }) => {
        console.log('radio value :', value);
        this.setState({ listValue: value });
        // close();
      },
    });
  };

  getDataTemp() {
    const { SetTemperature } = this.props;
    const T = SetTemperature.substring(4, 6);
    const V = parseInt(T, 16);
    const valueZ1 = V > 100 ? V - 256 : V;
    return valueZ1;
  }

  _changeDataTemp = valueZ1 => {
    this.setState({ valueZ1: Math.round(valueZ1) });
    const { SetTemperature } = this.props;
    const I = SetTemperature.substring(0, 4);
    const II = SetTemperature.substring(6, 10);
    const Tset = Math.round(valueZ1);
    // плявит
    const Tsend = Tset.toString(16);
    const ZorroOne = '0';
    const Tfin = Tset < 16 ? String(I + ZorroOne + Tsend + II) : String(I + Tsend + II);
    // не плявит, ибо 0
    const Zorro = '00';
    const Tfin0 = String(I + Zorro + II);
    // плявит обратно, ибо не 0 и не плявит
    const Tminus = 256 + Tset;
    const TsendMinus = Tminus.toString(16);
    const TfinMin = String(I + TsendMinus + II);
    // eslint-disable-next-line no-unused-expressions
    Tset > 0
      ? TYDevice.putDeviceData({
        [SetTemperatureCode]: Tfin,
      })
      : Tset === 0
        ? TYDevice.putDeviceData({
          [SetTemperatureCode]: Tfin0,
        })
        : Tset < 0
          ? TYDevice.putDeviceData({
            [SetTemperatureCode]: TfinMin,
          })
          : null;
  };

  // функции навиготора
  goToSettingsPage = () => {
    TYSdk.Navigator.push({
      id: 'SettingScene',
      title: Strings.getLang('settings'),
    });
  };

  goToZoneChart = () => {
    TYSdk.Navigator.push({
      id: 'ChartZone1Scene',
      title: Strings.getLang('charts'),
    });
  };

  // йункция таймера
  timer1 = () => {
    Popup.countdown(
      {
        title: ttimer,
        cancelText,
        confirmText,
        hourText: hrss,
        minuteText: minss,
        max: 1466,
        value: this.state.countdown,
        switchValue: this.state.countdownSwitchValue,
        onSwitchValueChange: value => this.setState({ countdownSwitchValue: value }),
        onMaskPress: ({ close }) => {
          close();
        },
        onConfirm: (data, { close }) => {
          this.setState({ countdown: data.value });
          if (data.value < 100) {
            console.log('return', data.value);
            return;
          }
          close();
        },
      },
      {
        onShow: () => console.log('show'),
        onHide: () => console.log('hide'),
        onDismiss: () => console.log('dismiss'),
      }
    );
  };

  // 'питание'
  changePowerZone1 = () => {
    const { Zone } = this.props;
    const I = Zone.substring(2, 6);
    const C = Zone.substring(0, 2);
    const C0 = '00';
    const C1 = '01';
    const C00 = String(C0 + I);
    const C01 = String(C1 + I);
    if (C === '01')
      TYDevice.putDeviceData({
        [ZoneCode]: C00,
      });
    TYDevice.putDeviceData({
      [ZoneCode]: C01,
    });
  };

  render() {
    const { Zone } = this.props;
    const C = Zone.substring(0, 2);
    return (
      <SafeAreaView style={styles.container}>
        {C === '01' ? (
          <View style={styles.area}>
            <View style={styles.sel}>
              <FontAwesomeIcon icon={faHandPointUp} color="#ffb700" size={16} marginRight={5} />
              <Text style={styles.titlekwh}>{Strings.getLang('manualtemp')}:</Text>
              <Text style={styles.num}> {this.state.valueZ1}°C</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.context}>-15</Text>
              <Slider.Horizontal
                style={styles.slider}
                canTouchTrack={true}
                maximumValue={80}
                stepValue={1}
                minimumValue={-15}
                value={this.getDataTemp()}
                maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                minimumTrackTintColor="#ffb700"
                onValueChange={valueZ1 => this.setState({ valueZ1: Math.round(valueZ1) })}
                onSlidingComplete={this._changeDataTemp}
              />
              <Text style={styles.context}>+80</Text>
            </View>
            <Stepper
              buttonType="ellipse"
              buttonStyle={{ size: 'small' }}
              ellipseIconColor="#ffb700"
              style={styles.stepper}
              inputStyle={{ color: 'transparent' }}
              editable={false}
              onValueChange={this._changeDataTemp}
              max={80}
              stepValue={1}
              min={-15}
              value={this.getDataTemp()}
            />
          </View>
        ) : null}
        <View style={styles.areaContols}>
          <TouchableOpacity onPress={this.changePowerZone1} style={styles.touch}>
            <FontAwesomeIcon
              icon={faPowerOff}
              color={C === '01' ? '#ffb700' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <Text style={styles.title}>{Strings.getLang('pwr')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.timer1} style={styles.touch}>
            <FontAwesomeIcon
              icon={faStopwatch20}
              color={C === '01' ? '#ffb700' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <Text style={styles.title}>{Strings.getLang('ttimer')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToZoneChart} style={styles.touch}>
            <FontAwesomeIcon
              icon={faChartBar}
              color={C === '01' ? '#ffb700' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <Text style={styles.title}>{Strings.getLang('prog')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressMode} style={styles.touch}>
            <FontAwesomeIcon
              icon={faTasks}
              color={C === '01' ? '#ffb700' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <Text style={styles.title}>{Strings.getLang('mode')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSettingsPage} style={styles.touch}>
            <FontAwesomeIcon icon={faCog} color="#ffb700" size={30} margin={5} />
            <Text style={styles.title}>{Strings.getLang('settings')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  area: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '90%',
    height: 145,
  },
  areaContols: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '90%',
    height: 70,
  },
  num: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  touch: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  sel: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  titlekwh: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 3,
  },
  context: {
    fontSize: 10,
    fontWeight: '200',
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  stepper: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
});

export default connect(({ dpState }) => ({
  Zone: dpState[ZoneCode],
  SetTemperature: dpState[SetTemperatureCode],
}))(Zone1);
