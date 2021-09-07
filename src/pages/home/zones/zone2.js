/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { TYSdk, Slider, Collapsible, Popup, TYText, Divider } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faThermometerQuarter,
  faSlidersH,
  faChartBar,
  faTasks,
  faAngleUp,
  faPowerOff,
  faStopwatch,
  faChevronRight,
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
  Relay2flag: Relay2flagCode,
  OpenWindowStatus: OpenWindowStatusCode,
  FaultAlarm: FaultAlarmCode,
  ReportTemperature: ReportTemperatureCode,
  SensorSet2: SensorSet2Code,
  OpenWndW: OpenWndWCode,
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
      valueZ1: V > 100 ? V - 256 : V,
      power: this.props.Zone.substring(2, 4),
      bar: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.SetTemperature !== nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(6, 8), 16);
      this.setState({ valueZ1: V > 100 ? V - 256 : V });
    }

    if (this.props.Zone !== nextProps.Zone) {
      this.setState({ power: nextProps.Zone.substring(2, 4) });
    }

    if (nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(6, 8), 16);
      this.setState({ valueZ1: V > 100 ? V - 256 : V });
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
        close();
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
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  };

  _changeDataTemp = valueZ2 => {
    this.setState({ valueZ1: Math.round(valueZ2) });
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

  async closeCollapse() {
    setTimeout(() => {
      this.setState({ bar: true });
    }, 14000);
  };

  render() {
    const { Relay2flag, OpenWindowStatus, FaultAlarm, SensorSet2, OpenWndW } = this.props;

    const OpenWndW1 = OpenWndW.substring(2, 4);
    const win = OpenWindowStatus > 0 && OpenWndW1 === '01';
    const alarm =
      FaultAlarm === 0 ? null : FaultAlarm === 1 ? null : FaultAlarm === 2 ? null : true;

    const t = this.props.ReportTemperature;
    const t1 = t.substring(2, 4);
    const t10 = parseInt(t1, 16);
    const t11 = SensorSet2 === 'air' ? '--' : t10 > 100 ? -(256 - t10) : t10;
    const t3 = t.substring(4, 6);
    const t30 = parseInt(t3, 16);
    const t33 = t30 > 100 ? -(256 - t30) : t30;

    const C = this.state.power;
    const modeZ = this.props.ModeChannel.substring(2, 4);
    const displayMode =
      C === '00'
        ? 'pwrOFF'
        : modeZ === '00'
          ? 'manualmode'
          : modeZ === '01'
            ? 'programmmode'
            : 'programmtimermode';
    const TimerOn = this.props.TimerSettings.substring(14, 16);
    const ProgTempI = parseInt(this.props.ReportProgTemp.substring(2, 4), 16);
    const ProgTemp = ProgTempI > 100 ? -(256 - ProgTempI) : ProgTempI;
    const hidden = this.state.bar;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.top}
            activeOpacity={0.9}
            onPress={() => {
              this.setState({ bar: !hidden });
              // this.closeCollapse();
            }}
          >
            <TYText
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#ff7300',
                alignSelf: 'flex-start',
                marginLeft: 8,
              }}
            >
              2
            </TYText>
            <FontAwesomeIcon
              icon={hidden === true ? faSlidersH : faAngleUp}
              color="#ff7300"
              size={22}
              marginRight={8}
            />
          </TouchableOpacity>
          <View style={styles.area}>
            <Collapsible
              collapsed={hidden}
              onChange={() => {}}
              align="center"
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={styles.areaContols}>
                <TouchableOpacity onPress={this.changePowerZone2} style={styles.touch}>
                  <TYText style={styles.title}>{Strings.getLang('pwr')}</TYText>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    color={C === '01' ? '#ff7300' : '#d6d6d6'}
                    size={30}
                    margin={5}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={C === '01' && modeZ !== '02' ? this.timer1 : null}
                  style={styles.touch}
                  activeOpacity={C === '01' && modeZ !== '02' ? 0.2 : 1}
                >
                  <TYText style={styles.title}>
                    {TimerOn === '00'
                      ? Strings.getLang('ttimer')
                      : this.convertMinsToTime(
                        parseInt(this.props.TimerSettings.substring(4, 8), 16)
                      )}
                  </TYText>
                  <FontAwesomeIcon
                    icon={faStopwatch}
                    color={C === '01' && modeZ !== '02' ? '#ff7300' : '#d6d6d6'}
                    size={30}
                    margin={5}
                  />
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
                  activeOpacity={C === '01' && modeZ !== '00' ? 0.2 : 1}
                >
                  <TYText style={styles.title}>{Strings.getLang('prog')}</TYText>
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
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={C === '01' ? this.onPressMode : null}
                  style={styles.touch}
                  activeOpacity={C === '01' ? 0.2 : 1}
                >
                  <TYText style={styles.title}>{Strings.getLang('mode')}</TYText>
                  <FontAwesomeIcon
                    icon={faTasks}
                    color={C === '01' ? '#ff7300' : '#d6d6d6'}
                    size={30}
                    margin={5}
                  />
                </TouchableOpacity>
              </View>
            </Collapsible>
            {hidden && <Divider color={win === true ? '#00d0ff' : alarm === true ? 'red' : null} />}
            <View style={[styles.report, { marginTop: 8 }]}>
              <View style={styles.inf}>
                <TYText style={win === true ? styles.w1 : [styles.r1, { color: '#949494' }]}>
                  {win === true ? Strings.getLang('wintitle') : Strings.getLang('relaySS')}
                </TYText>
                <TYText
                  style={
                    win === true ? [styles.w1, { fontSize: 20 }] : [styles.r1, { fontSize: 20 }]
                  }
                >
                  {Relay2flag === true
                    ? Strings.getLang('on')
                    : win === true
                      ? `${OpenWindowStatus} ${Strings.getLang('minss')}`
                      : Strings.getLang('off')}
                </TYText>
              </View>
              {TimerOn === '00' ? null : (
                <View style={styles.inf}>
                  <TYText style={[styles.r1, { color: '#949494' }]}>
                    {Strings.getLang('ttimer')}
                  </TYText>
                  <TYText style={[styles.r1, { fontSize: 20 }]}>
                    {this.convertMinsToTime(parseInt(this.props.TimerSettings.substring(4, 8), 16))}
                  </TYText>
                </View>
              )}
              <View style={styles.inf}>
                <TYText
                  style={
                    alarm === true
                      ? [styles.a1, { fontWeight: 'bold' }]
                      : [styles.r1, { color: '#949494' }]
                  }
                >
                  {`${Strings.getLang(
                    `${
                      alarm === true ? 'alarma' : SensorSet2 !== 'air' ? 'now_temp' : 'now_temp_air'
                    }`
                  )}`}
                </TYText>
                <TYText
                  style={
                    alarm === true ? [styles.a1, { fontSize: 20 }] : [styles.r1, { fontSize: 20 }]
                  }
                >
                  {`${
                    alarm === true
                      ? Strings.getLang('sen_err')
                      : SensorSet2 === 'air'
                        ? `${t33}°C`
                        : `${t11}°C`
                  }`}
                </TYText>
              </View>
            </View>
            <Divider
              color={win === true ? '#00d0ff' : alarm === true ? 'red' : null}
              style={{ marginTop: 8 }}
            />
            <View style={[styles.sel, { flexDirection: 'column', marginTop: 18 }]}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                activeOpacity={0.9}
                onPress={modeZ === '01' || modeZ === '02' ? this.goToZoneChart : null}
              >
                <TYText style={[styles.num, { fontSize: 20, color: '#949494' }]}>
                  {Strings.getLang(displayMode)}
                </TYText>
                {(modeZ === '01' || modeZ === '02') && C === '01' ? (
                  <FontAwesomeIcon icon={faChevronRight} color="#ff7300" size={22} marginLeft={8} />
                ) : null}
              </TouchableOpacity>
              <View style={[styles.sel, { flexDirection: 'row' }]}>
                {modeZ === '02' ? null : (
                  <FontAwesomeIcon
                    icon={faThermometerQuarter}
                    color={C === '01' ? '#ff7300' : '#d6d6d6'}
                    size={30}
                    marginRight={5}
                  />
                )}
                <TYText style={[styles.num, { fontSize: 30 }]}>
                  {C === '00'
                    ? '--'
                    : modeZ === '00'
                      ? this.state.valueZ1
                      : modeZ === '01'
                        ? this.props.ReportProgTemp.substring(2, 4) === '81'
                          ? '--'
                          : ProgTemp
                        : '⏱'}
                  {modeZ === '02' ? null : '°C'}
                </TYText>
              </View>
            </View>
            <View style={[styles.title, { paddingBottom: 8 }]}>
              <Slider.Horizontal
                animationType="timing"
                disabled={modeZ !== '00' || C === '00' || alarm}
                theme={{
                  width: 300,
                  height: 36,
                  trackRadius: 18,
                  trackHeight: 36,
                  thumbSize: 20,
                  thumbRadius: 20,
                  thumbTintColor: modeZ !== '00' || C === '00' || alarm ? '#f0f0f0' : '#fff',
                  minimumTrackTintColor: '#f0f0f0',
                  maximumTrackTintColor: '#f0f0f0',
                }}
                thumbTouchSize={{ width: 36, height: 36 }}
                thumbStyle={{
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  width: 22,
                  height: 22,
                  borderColor: modeZ !== '00' || C === '00' ? '#E3E9EE' : alarm ? 'red' : '#ff7300',
                  borderWidth: 3,
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  elevation: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                type="parcel"
                renderMinimumTrack={() => (
                  <View
                    style={{
                      height: 30,
                      borderRadius: 15,
                      backgroundColor:
                        C === '00' || alarm ? '#f0f0f0' : '#fff',
                      marginHorizontal: 3,
                    }}
                  />
                )}
                style={styles.slider}
                canTouchTrack={true}
                maximumValue={45}
                stepValue={1}
                minimumValue={5}
                value={modeZ === '00' ? this.getDataTemp() : modeZ === '01' ? ProgTemp : 33}
                onValueChange={valueZ1 => this.setState({ valueZ1: Math.round(valueZ1) })}
                onSlidingComplete={this._changeDataTemp}
              />
            </View>
          </View>
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
  Relay2flag: PropTypes.bool,
  OpenWindowStatus: PropTypes.number,
  FaultAlarm: PropTypes.number,
  ReportTemperature: PropTypes.string,
  SensorSet2: PropTypes.string,
  OpenWndW: PropTypes.string,
};

Zone2.defaultProps = {
  Zone: '010101',
  SetTemperature: '1E1E141414',
  ModeChannel: '000000',
  ReportProgTemp: '001515',
  TimerSettings: '000000000000000000',
  Relay2flag: false,
  OpenWindowStatus: 0,
  FaultAlarm: 0,
  ReportTemperature: '112233',
  SensorSet2: 'air_flour',
  OpenWndW: '0000',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 5,
  },
  report: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
  },
  inf: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  r1: {
    color: '#666',
    alignSelf: 'center',
  },
  w1: {
    color: '#00d0ff',
    alignSelf: 'center',
  },
  a1: {
    color: 'red',
    alignSelf: 'center',
  },
  area: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    // height: 250,
  },
  areaContols: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#E3E9EE',
    borderRadius: 12,
    padding: 5,
    width: '95%',
  },
  num: {
    textAlign: 'center',
    color: '#666',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    color: '#949494',
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
    fontWeight: '200',
    fontSize: 10,
    color: '#666',
    margin: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 3,
  },
});

export default connect(({ dpState }) => ({
  Zone: dpState[ZoneCode],
  SetTemperature: dpState[SetTemperatureCode],
  ModeChannel: dpState[ModeChannelCode],
  TimerSettings: dpState[TimerSettingsCode],
  ReportProgTemp: dpState[ReportProgTempCode],
  Relay2flag: dpState[Relay2flagCode],
  OpenWindowStatus: dpState[OpenWindowStatusCode],
  FaultAlarm: dpState[FaultAlarmCode],
  ReportTemperature: dpState[ReportTemperatureCode],
  SensorSet2: dpState[SensorSet2Code],
  OpenWndW: dpState[OpenWndWCode],
}))(Zone2);
