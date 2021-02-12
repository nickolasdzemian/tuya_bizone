/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const {
  Zone: ZoneCode,
  SetTemperature: SetTemperatureCode,
  ModeChannel: ModeChannelCode,
  TimerSettings: TimerSettingsCode,
} = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const mode = Strings.getLang('mode');
const ttimer = Strings.getLang('ttimer');
const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');

class Zone1 extends PureComponent {
  constructor(props) {
    super(props);
    const T = this.props.SetTemperature.substring(4, 6);
    const V = parseInt(T, 16);
    this.state = { valueZ1: V > 100 ? V - 256 : V };
  }

  // уйнкция выбора режима
  onPressMode = () => {
    const modeI = this.props.ModeChannel.substring(2, 6);
    const modeZ = this.props.ModeChannel.substring(0, 2);
    const modeZTime = '02';
    const modeZProg = '01';
    const modeZMan = '00';
    Popup.list({
      type: 'radio',
      maxItemNum: 3,
      dataSource: [
        {
          key: '00',
          title: Strings.getLang('manualmode'),
          value: String(modeZMan + modeI),
        },
        {
          key: '01',
          title: Strings.getLang('programmmode'),
          value: String(modeZProg + modeI),
        },
        {
          key: '02',
          title: Strings.getLang('programmtimermode'),
          value: String(modeZTime + modeI),
        },
      ],
      iconTintColor: '#ffb700',
      title: [mode],
      cancelText,
      confirmText,
      showBack: false,
      onBack: ({ close }) => {
        console.log('Select climate --none');
        close();
      },
      value: String(modeZ + modeI),
      footerType: 'singleCancel',
      onMaskPress: ({ close }) => {
        close();
      },
      // выбор и сохранение значения из списка по нажатию
      onSelect: (value, { close }) => {
        TYDevice.putDeviceData({
          [ModeChannelCode]: value,
        });
        // eslint-disable-next-line react/no-unused-state
        this.setState({ listValue: value });
        this.forceUpdate();
        // close();
      },
    });
  };

  getDataTemp() {
    const T = this.props.SetTemperature.substring(4, 6);
    const V = parseInt(T, 16);
    const valueZ1 = V > 100 ? V - 256 : V;
    return valueZ1;
  }

  convertMinsToTime = mins => {
    const hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}${hrss}:${minutes}${minss}`;
  };

  _changeDataTemp = valueZ1 => {
    this.setState({ valueZ1: Math.round(valueZ1) }, () => {
      const I = this.props.SetTemperature.substring(0, 4);
      const II = this.props.SetTemperature.substring(6, 10);
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
    });
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
        max: 1440,
        value: parseInt(this.props.TimerSettings.substring(0, 4), 16),
        switchValue: this.props.TimerSettings.substring(12, 14) === '01',
        onSwitchValueChange: () => {
          const TimerSwitch = this.props.TimerSettings.substring(12, 14);
          const I = this.props.TimerSettings.substring(0, 12);
          const II = this.props.TimerSettings.substring(14, 18);
          // const ON = '01';
          const OFF = '00';
          const Tfin = TimerSwitch === '00' ? null : String(I + OFF + II);
          TYDevice.putDeviceData({
            [TimerSettingsCode]: Tfin,
          });
        },
        onMaskPress: ({ close }) => {
          close();
        },
        onConfirm: (data, { close }) => {
          if (data.value < 1441) {
            console.log('return', data.value);
            const TimerI = this.props.TimerSettings.substring(4, 12);
            const TimerII = this.props.TimerSettings.substring(14, 18);
            const Tset = data.value;
            const Tsend = Tset.toString(16);
            console.log('Tsend', Tsend);
            const Tfin =
              Tset < 16
                ? String(`000${Tsend}${TimerI}01${TimerII}`)
                : Tset < 255 && Tset > 15
                  ? String(`00${Tsend}${TimerI}01${TimerII}`)
                  : Tset < 1467 && Tset > 254
                    ? String(`0${Tsend}${TimerI}01${TimerII}`)
                    : null;
            TYDevice.putDeviceData({
              [TimerSettingsCode]: Tfin,
            });
            this.forceUpdate();
          }
          close();
        },
      },
      {
        onShow: () => this.forceUpdate(),
        onHide: () => this.forceUpdate(this.render),
        onDismiss: () => console.log('dismiss'),
      }
    );
  };

  // 'питание'
  changePowerZone1 = () => {
    const I = this.props.Zone.substring(2, 6);
    const C = this.props.Zone.substring(0, 2);
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
    const C = this.props.Zone.substring(0, 2);
    const modeZ = this.props.ModeChannel.substring(0, 2);
    const TimerOn = this.props.TimerSettings.substring(12, 14);
    return (
      <SafeAreaView style={styles.container}>
        {C === '01' ? (
          <View style={styles.area}>
            <View style={styles.sel}>
              <FontAwesomeIcon icon={faHandPointUp} color="#ffb700" size={16} marginRight={5} />
              <Text style={styles.titlekwh}>
                {Strings.getLang('manualtemp')}
                {': '}
              </Text>
              <Text style={styles.num}>
                {this.state.valueZ1}
                °C
              </Text>
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
          <TouchableOpacity
            onPress={C === '01' && modeZ !== '02' ? this.timer1 : null}
            style={styles.touch}
          >
            <FontAwesomeIcon
              icon={TimerOn === '01' ? faStopwatch20 : faStopwatch}
              color={C === '01' && modeZ !== '02' ? '#ffb700' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <Text style={styles.title}>
              {TimerOn === '00'
                ? Strings.getLang('ttimer')
                : this.convertMinsToTime(parseInt(this.props.TimerSettings.substring(0, 4), 16))}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={C === '01' ? this.goToZoneChart : null} style={styles.touch}>
            <FontAwesomeIcon
              icon={faChartBar}
              color={C === '01' ? '#ffb700' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <Text style={styles.title}>{Strings.getLang('prog')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={C === '01' ? this.onPressMode : null} style={styles.touch}>
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

Zone1.propTypes = {
  Zone: PropTypes.string,
  SetTemperature: PropTypes.string,
  ModeChannel: PropTypes.string,
  TimerSettings: PropTypes.string,
};

Zone1.defaultProps = {
  Zone: '010101',
  SetTemperature: '1E1E141414',
  ModeChannel: '000000',
  TimerSettings: '000000000000000000',
};

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
    height: 160,
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
  ModeChannel: dpState[ModeChannelCode],
  TimerSettings: dpState[TimerSettingsCode],
}))(Zone1);
