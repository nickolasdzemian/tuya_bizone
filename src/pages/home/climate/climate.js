/* eslint-disable react/destructuring-assignment */
// установка температуры поддержания и настройка вентилятора для климат-режима
import PropTypes, { number } from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Slider, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFan, faThermometerQuarter } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;
const {
  FanSpeed: FanSpeedCode,
  Zone: ZoneCode,
  SetTemperature: SetTemperatureCode,
  ModeChannel: ModeChannelCode,
  ReportProgTemp: ReportProgTempCode,
  FaultAlarm: FaultAlarmCode,
} = dpCodes;

class ClimateM extends PureComponent {
  constructor(props) {
    super(props);
    const fanValue = this.props.FanSpeed;
    this.state = {
      valueM0: this.getDataTemp(),
      fan:
        fanValue === number
          ? fanValue
          : fanValue === 'FAN_OFF'
            ? 0
            : fanValue === 'FAN_LOW'
              ? 1
              : fanValue === 'FAN_MID'
                ? 2
                : fanValue === 'FAN_HIGH'
                  ? 3
                  : fanValue === 'FAN_AUTO'
                    ? 4
                    : 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.SetTemperature !== nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(8, 10), 16);
      this.setState({ valueM0: V > 100 ? V - 256 : V });
    }

    if (this.props.FanSpeed !== nextProps.FanSpeed) {
      const fanValue0 = nextProps.FanSpeed;
      const fanValue = fanValue0 === 'FAN_OFF'
        ? 0
        : fanValue0 === 'FAN_LOW'
          ? 1
          : fanValue0 === 'FAN_MID'
            ? 2
            : fanValue0 === 'FAN_HIGH'
              ? 3
              : fanValue0 === 'FAN_AUTO'
                ? 4
                : null;
      this.setState({ fan: fanValue });
    }

    if (nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(8, 10), 16);
      this.setState({ valueM0: V > 100 ? V - 256 : V });
    }

    if (nextProps.FanSpeed) {
      const fanValue0 = nextProps.FanSpeed;
      const fanValue = fanValue0 === 'FAN_OFF'
        ? 0
        : fanValue0 === 'FAN_LOW'
          ? 1
          : fanValue0 === 'FAN_MID'
            ? 2
            : fanValue0 === 'FAN_HIGH'
              ? 3
              : fanValue0 === 'FAN_AUTO'
                ? 4
                : null;
      this.setState({ fan: fanValue });
    }
  }

  getDataTemp() {
    const T = this.props.SetTemperature.substring(8, 10);
    const V = parseInt(T, 16);
    const valueM0 = V > 100 ? V - 256 : V;
    return valueM0;
  }

  // отправка данных по изменению в переключателях
  changeDataFan(value) {
    this.setState({ fan: value });
    const sendValue =
      value === 0
        ? 'FAN_OFF'
        : value === 1
          ? 'FAN_LOW'
          : value === 2
            ? 'FAN_MID'
            : value === 3
              ? 'FAN_HIGH'
              : value === 4
                ? 'FAN_AUTO'
                : 'FAN_OFF';
    TYDevice.putDeviceData({
      [FanSpeedCode]: sendValue,
    });
  }

  _changeDataTemp = valueM0 => {
    this.setState({ valueM0: Math.round(valueM0) });
    const I = this.props.SetTemperature.substring(0, 8);
    const Tset = Math.round(valueM0);
    // плявит
    const Tsend = Tset.toString(16);
    const ZorroOne = '0';
    const Tfin = Tset < 16 ? String(I + ZorroOne + Tsend) : String(I + Tsend);
    // не плявит, ибо 0
    const Zorro = '00';
    const Tfin0 = String(I + Zorro);
    // плявит обратно, ибо не 0 и не плявит
    const Tminus = 256 + Tset;
    const TsendMinus = Tminus.toString(16);
    const TfinMin = String(I + TsendMinus);
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

  render() {
    const C = this.props.Zone.substring(4, 6);
    const modeCli = this.props.ModeChannel.substring(4, 6);
    const ProgTempCli0 = parseInt(this.props.ReportProgTemp.substring(4, 6), 16);
    const ProgTempCli = ProgTempCli0 > 100 ? -(256 - ProgTempCli0) : ProgTempCli0;
    const alarm = this.props.FaultAlarm;
    const displayMode =
      C === '00'
        ? 'pwrOFF'
        : modeCli === '00'
          ? 'manualmode'
          : modeCli === '01'
            ? 'programmmode'
            : 'programmtimermode';
    return C === '01' ? (
      <SafeAreaView style={styles.container}>
        <View style={styles.area}>
          <TYText style={[styles.num, { fontSize: 20, color: '#949494', marginTop: 8 }]}>
            {Strings.getLang(displayMode)}
          </TYText>
          <View style={styles.title}>
            <FontAwesomeIcon
              icon={faThermometerQuarter}
              color="#57BCFB"
              size={25}
              marginRight={10}
            />
            <TYText style={styles.num}>
              {modeCli === '00'
                ? this.state.valueM0
                : modeCli === '01'
                  ? ProgTempCli
                  : alarm !== 0
                    ? '--'
                    : '--'}
              °C
            </TYText>
          </View>
          <View style={styles.title}>
            <Slider.Horizontal
              animationType="spring"
              disabled={modeCli !== '00' || C === '00' || alarm !== 0}
              theme={{
                width: 300,
                height: 46,
                trackRadius: 16,
                trackHeight: 46,
                thumbSize: 20,
                thumbRadius: 20,
                thumbTintColor: modeCli !== '00' || C === '00' || alarm ? '#E3E9EE' : '#57BCFB',
                minimumTrackTintColor: '#f0f0f0',
                maximumTrackTintColor: '#f0f0f0',
              }}
              thumbTouchSize={{ width: 46, height: 46 }}
              thumbStyle={{
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="parcel"
              renderMinimumTrack={() => (
                <View
                  style={{
                    height: 38,
                    borderRadius: 14,
                    backgroundColor:
                      modeCli !== '00' || C === '00' || alarm !== 0 ? '#E3E9EE' : '#57BCFB',
                    marginHorizontal: 4,
                  }}
                />
              )}
              renderThumb={() => (
                <View
                  style={{
                    height: 20,
                    borderRadius: 5.5,
                    width: 5,
                    backgroundColor: alarm !== 0 ? 'red' : '#FFF',
                  }}
                />
              )}
              style={{
                width: '80%',
                alignSelf: 'center',
                marginBottom: 8,
              }}
              canTouchTrack={true}
              maximumValue={80}
              stepValue={1}
              minimumValue={-15}
              value={modeCli === '00' ? this.getDataTemp() : modeCli === '01' ? ProgTempCli : 33}
              onValueChange={valueM0 => this.setState({ valueM0: Math.round(valueM0) })}
              onSlidingComplete={this._changeDataTemp}
            />
          </View>
        </View>
        <View style={styles.area}>
          <TYText style={[styles.num, { fontSize: 20, color: '#949494', marginTop: 8 }]}>
            {Strings.getLang('fantitle')}
          </TYText>
          <View style={styles.title}>
            <FontAwesomeIcon icon={faFan} color="#57BCFB" size={25} marginRight={10} />
            <TYText style={styles.num}>{Strings.getLang(this.state.fan)}</TYText>
          </View>
          <View style={styles.title}>
            <Slider.Horizontal
              animationType="timing"
              disabled={C === '00' || alarm !== 0}
              theme={{
                width: 300,
                height: 46,
                trackRadius: 16,
                trackHeight: 46,
                thumbSize: 20,
                thumbRadius: 20,
                thumbTintColor: C === '00' || alarm ? '#E3E9EE' : '#57BCFB',
                minimumTrackTintColor: '#f0f0f0',
                maximumTrackTintColor: '#f0f0f0',
              }}
              thumbTouchSize={{ width: 46, height: 46 }}
              thumbStyle={{
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="parcel"
              renderMinimumTrack={() => (
                <View
                  style={{
                    height: 38,
                    borderRadius: 14,
                    backgroundColor: C === '00' || alarm !== 0 ? '#E3E9EE' : '#57BCFB',
                    marginHorizontal: 4,
                  }}
                />
              )}
              renderThumb={() => (
                <View
                  style={{
                    height: 20,
                    borderRadius: 5.5,
                    width: 5,
                    backgroundColor: alarm !== 0 ? 'red' : '#FFF',
                  }}
                />
              )}
              style={{
                width: '80%',
                alignSelf: 'center',
                marginBottom: 8,
              }}
              canTouchTrack={true}
              maximumValue={4}
              stepValue={1}
              minimumValue={0}
              value={this.state.fan}
              onValueChange={value => this.setState({ fan: value })}
              onSlidingComplete={value => this.changeDataFan(value)}
              useNoun={true}
              // minNounStyle={{ backgroundColor: '#f0f' }}
            />
          </View>
        </View>
      </SafeAreaView>
    ) : null;
  }
}

ClimateM.propTypes = {
  FanSpeed: PropTypes.string,
  Zone: PropTypes.string,
  SetTemperature: PropTypes.string,
  ReportProgTemp: PropTypes.string,
  ModeChannel: PropTypes.string,
  FaultAlarm: PropTypes.number,
};

ClimateM.defaultProps = {
  FanSpeed: 'FAN_OFF',
  Zone: '010101',
  SetTemperature: '1E1E141414',
  ReportProgTemp: '001515',
  ModeChannel: '000000',
  FaultAlarm: 0,
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
    height: 140,
  },
  num: {
    textAlign: 'center',
    fontSize: 26,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 10,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(({ dpState }) => ({
  FanSpeed: dpState[FanSpeedCode],
  Zone: dpState[ZoneCode],
  SetTemperature: dpState[SetTemperatureCode],
  ModeChannel: dpState[ModeChannelCode],
  ReportProgTemp: dpState[ReportProgTempCode],
  FaultAlarm: dpState[FaultAlarmCode],
}))(ClimateM);
