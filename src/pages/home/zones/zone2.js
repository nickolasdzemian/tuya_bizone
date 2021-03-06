/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Slider, Stepper, Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHandPointUp,
  faChartBar,
  faTasks,
  faCog,
  faPowerOff,
  faStopwatch20,
  faStopwatch,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const {
  Zone: ZoneCode,
  SetTemperature: SetTemperatureCode,
  ModeChannel: ModeChannelCode,
  TimerSettings: TimerSettingsCode,
  ReportProgTemp: ReportProgTempCode,
} = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const mode = Strings.getLang('mode');
const ttimer = Strings.getLang('ttimer');
const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');

class Zone2 extends PureComponent {
  constructor(props) {
    super(props);
    const T = this.props.SetTemperature.substring(6, 8);
    const V = parseInt(T, 16);
    this.state = {
      valueZ2: V > 100 ? V - 256 : V,
      power: this.props.Zone.substring(2, 4),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.SetTemperature !== nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(6, 8), 16);
      this.setState({ valueZ2: V > 100 ? V - 256 : V });
    }

    if (this.props.Zone !== nextProps.Zone) {
      this.setState({ power: nextProps.Zone.substring(2, 4) });
    }

    if (nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(6, 8), 16);
      this.setState({ valueZ2: V > 100 ? V - 256 : V });
    }

    if (nextProps.Zone) {
      this.setState({ power: nextProps.Zone.substring(2, 4) });
    }
  }

  // уйнкция выбора режима
  onPressMode = () => {
    const modeI = this.props.ModeChannel.substring(4, 6);
    const modeII = this.props.ModeChannel.substring(0, 2);
    const modeZ = this.props.ModeChannel.substring(2, 4);
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
          value: String(modeII + modeZMan + modeI),
        },
        {
          key: '01',
          title: Strings.getLang('programmmode'),
          value: String(modeII + modeZProg + modeI),
        },
        {
          key: '02',
          title: Strings.getLang('programmtimermode'),
          value: String(modeII + modeZTime + modeI),
        },
      ],
      iconTintColor: '#ff7300',
      title: [mode],
      cancelText,
      confirmText,
      showBack: false,
      onBack: ({ close }) => {
        console.log('Select climate --none');
        close();
      },
      value: String(modeII + modeZ + modeI),
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
    const { SetTemperature } = this.props;
    const T = SetTemperature.substring(6, 8);
    const V = parseInt(T, 16);
    const valueZ2 = V > 100 ? V - 256 : V;
    return valueZ2;
  }

  convertMinsToTime = mins => {
    const hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}${hrss}:${minutes}${minss}`;
  };

  _changeDataTemp = valueZ2 => {
    this.setState({ valueZ2: Math.round(valueZ2) });
    const { SetTemperature } = this.props;
    const I = SetTemperature.substring(0, 6);
    const II = SetTemperature.substring(8, 10);
    const Tset = Math.round(valueZ2);
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
      id: 'ChartZone2Scene',
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
        value: parseInt(this.props.TimerSettings.substring(4, 8), 16),
        switchValue: this.props.TimerSettings.substring(14, 16) === '01',
        onSwitchValueChange: () => {
          const TimerSwitch = this.props.TimerSettings.substring(14, 16);
          const I = this.props.TimerSettings.substring(0, 14);
          const II = this.props.TimerSettings.substring(16, 18);
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
            const TimerO = this.props.TimerSettings.substring(0, 4);
            const TimerI = this.props.TimerSettings.substring(8, 14);
            const TimerII = this.props.TimerSettings.substring(16, 18);
            const Tset = data.value;
            const Tsend = Tset.toString(16);
            console.log('Tsend', Tsend);
            const Tfin =
              Tset < 16
                ? String(`${TimerO}000${Tsend}${TimerI}01${TimerII}`)
                : Tset < 255 && Tset > 15
                  ? String(`${TimerO}00${Tsend}${TimerI}01${TimerII}`)
                  : Tset < 1467 && Tset > 254
                    ? String(`${TimerO}0${Tsend}${TimerI}01${TimerII}`)
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
  changePowerZone2 = () => {
    const { Zone } = this.props;
    const I = Zone.substring(0, 2);
    const II = Zone.substring(4, 6);
    const C = Zone.substring(2, 4);
    const C00 = String(`${I}00${II}`);
    const C01 = String(`${I}01${II}`);
    TYDevice.putDeviceData({
      [ZoneCode]: C === '01' ? C00 : C01,
    });
    this.setState({ power: C === '01' ? '00' : '01' });
  };

  render() {
    const C = this.state.power;
    const modeZ = this.props.ModeChannel.substring(2, 4);
    const TimerOn = this.props.TimerSettings.substring(14, 16);
    const ProgTempI = parseInt(this.props.ReportProgTemp.substring(2, 4), 16);
    const ProgTemp = ProgTempI > 100 ? -(256 - ProgTempI) : ProgTempI;
    return (
      <SafeAreaView style={styles.container}>
        {C === '01' ? (
          <View style={modeZ === '00' ? styles.area : styles.areaAir}>
            {modeZ === '00' ? (
              <View style={styles.area}>
                <View style={styles.sel}>
                  <FontAwesomeIcon icon={faHandPointUp} color="#ff7300" size={16} marginRight={5} />
                  <TYText style={styles.titlekwh}>
                    {Strings.getLang('manualtemp')}
                    {': '}
                  </TYText>
                  <TYText style={styles.num}>
                    {this.state.valueZ2}
                    °C
                  </TYText>
                </View>
                <View style={styles.title}>
                  <TYText style={styles.context}>-15</TYText>
                  <Slider.Horizontal
                    style={styles.slider}
                    canTouchTrack={true}
                    maximumValue={80}
                    stepValue={1}
                    minimumValue={-15}
                    value={this.getDataTemp()}
                    maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                    minimumTrackTintColor="#ff7300"
                    onValueChange={valueZ2 => this.setState({ valueZ2: Math.round(valueZ2) })}
                    onSlidingComplete={this._changeDataTemp}
                  />
                  <TYText style={styles.context}>+80</TYText>
                </View>
                <Stepper
                  buttonType="ellipse"
                  buttonStyle={{ size: 'small' }}
                  ellipseIconColor="#ff7300"
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
            ) : modeZ === '01' ? (
              <View style={styles.areaAir}>
                <TYText style={styles.titlekwh}>{Strings.getLang('manualtemp')}</TYText>
                <View style={styles.title}>
                  <FontAwesomeIcon icon={faWaveSquare} color="#ff7300" size={25} marginRight={10} />
                  <TYText style={styles.num}>
                    {this.props.ReportProgTemp.substring(2, 4) === '81' ? '--' : ProgTemp}
                    °C
                  </TYText>
                </View>
              </View>
            ) : (
              <View style={styles.areaAir}>
                <TYText style={styles.titlekwh}>{Strings.getLang('programmtimermode')}</TYText>
                <View style={styles.title}>
                  <FontAwesomeIcon icon={faWaveSquare} color="#ff7300" size={25} marginRight={10} />
                </View>
              </View>)}
          </View>
        ) : null}
        <View style={styles.areaContols}>
          <TouchableOpacity onPress={this.changePowerZone2} style={styles.touch}>
            <FontAwesomeIcon
              icon={faPowerOff}
              color={C === '01' ? '#ff7300' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <TYText style={styles.title}>{Strings.getLang('pwr')}</TYText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={C === '01' && modeZ !== '02' ? this.timer1 : null}
            style={styles.touch}
          >
            <FontAwesomeIcon
              icon={TimerOn === '01' ? faStopwatch20 : faStopwatch}
              color={C === '01' && modeZ !== '02' ? '#ff7300' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <TYText style={styles.title}>
              {TimerOn === '00'
                ? Strings.getLang('ttimer')
                : this.convertMinsToTime(parseInt(this.props.TimerSettings.substring(4, 8), 16))}
            </TYText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              C === '01' && modeZ === '01'
                ? this.goToZoneChart
                : C === '01' && modeZ === '02'
                  ? this.goToZoneChart
                  : null
            }
            style={styles.touch}
          >
            <FontAwesomeIcon
              icon={faChartBar}
              color={
                C === '01' && modeZ === '01'
                  ? '#ff7300'
                  : C === '01' && modeZ === '02'
                    ? '#ff7300'
                    : '#d6d6d6'
              }
              size={30}
              margin={5}
            />
            <TYText style={styles.title}>{Strings.getLang('prog')}</TYText>
          </TouchableOpacity>
          <TouchableOpacity onPress={C === '01' ? this.onPressMode : null} style={styles.touch}>
            <FontAwesomeIcon
              icon={faTasks}
              color={C === '01' ? '#ff7300' : '#d6d6d6'}
              size={30}
              margin={5}
            />
            <TYText style={styles.title}>{Strings.getLang('mode')}</TYText>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSettingsPage} style={styles.touch}>
            <FontAwesomeIcon icon={faCog} color="#ff7300" size={30} margin={5} />
            <TYText style={styles.title}>{Strings.getLang('settings')}</TYText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

Zone2.propTypes = {
  Zone: PropTypes.string,
  SetTemperature: PropTypes.string,
  ModeChannel: PropTypes.string,
  ReportProgTemp: PropTypes.string,
  TimerSettings: PropTypes.string,
};

Zone2.defaultProps = {
  Zone: '010101',
  SetTemperature: '1E1E141414',
  ModeChannel: '000000',
  ReportProgTemp: '001515',
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
  areaAir: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '90%',
    height: 60,
  },
  num: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#474747',
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
  ReportProgTemp: dpState[ReportProgTempCode],
}))(Zone2);
