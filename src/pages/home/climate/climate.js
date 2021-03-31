/* eslint-disable react/destructuring-assignment */
// установка температуры поддержания и настройка вентилятора для климат-режима
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Slider, Stepper, TabBar, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFan, faHandPointUp, faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;
const {
  FanSpeed: FanSpeedCode,
  Zone: ZoneCode,
  SetTemperature: SetTemperatureCode,
  ModeChannel: ModeChannelCode,
  ReportProgTemp: ReportProgTempCode,
} = dpCodes;

// режимы вентилятора
const fan = [
  {
    key: 'FAN_OFF',
    title: Strings.getLang('FAN_OFF'),
    value: 'FAN_OFF',
  },
  {
    key: 'FAN_LOW',
    title: Strings.getLang('FAN_LOW'),
    value: 'FAN_LOW',
  },
  {
    key: 'FAN_MID',
    title: Strings.getLang('FAN_MID'),
    value: 'FAN_MID',
  },
  {
    key: 'FAN_HIGH',
    title: Strings.getLang('FAN_HIGH'),
    value: 'FAN_HIGH',
  },
  {
    key: 'FAN_AUTO',
    title: Strings.getLang('FAN_AUTO'),
    value: 'FAN_AUTO',
  },
];

class ClimateM extends PureComponent {
  constructor(props) {
    super(props);
    // инициализация и текущий state для slidera
    const T = this.props.SetTemperature.substring(8, 10);
    const V = parseInt(T, 16);
    this.state = { 
      valueM0: this.getDataTemp(),
      fan: this.props.FanSpeed,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.SetTemperature !== nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(8, 10), 16);
      this.setState({ valueM0: V > 100 ? V - 256 : V });
    }

    if (this.props.FanSpeed !== nextProps.FanSpeed) {
      this.setState({ fan: nextProps.FanSpeed });
    }

    if (nextProps.SetTemperature) {
      const V = parseInt(nextProps.SetTemperature.substring(8, 10), 16);
      this.setState({ valueM0: V > 100 ? V - 256 : V });
    }

    if (nextProps.FanSpeed) {
      this.setState({ fan: nextProps.FanSpeed });
    }
  }

  getDataTemp() {
    const T = this.props.SetTemperature.substring(8, 10);
    const V = parseInt(T, 16);
    const valueM0 = V > 100 ? V - 256 : V;
    return valueM0;
  }

  // отправка данных по изменению в переключателях
  changeDataFan = value => {
    this.setState({ fan: value });
    TYDevice.putDeviceData({
      [FanSpeedCode]: value,
    });
  };

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
    return C === '01' ? (
      <SafeAreaView style={styles.container}>
        {modeCli === '00' ? (
          <View style={styles.area}>
            <Text style={styles.titlekwh}>{Strings.getLang('manualtemp')}</Text>
            <View style={styles.title}>
              <FontAwesomeIcon icon={faHandPointUp} color="#90EE90" size={25} marginRight={10} />
              <Text style={styles.num}>
                {this.state.valueM0}
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
                value={this.state.valueM0}
                maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                minimumTrackTintColor="#90EE90"
                onValueChange={valueM0 => this.setState({ valueM0: Math.round(valueM0) })}
                onSlidingComplete={this._changeDataTemp}
              />
              <Text style={styles.context}>+80</Text>
            </View>
            <Stepper
              buttonType="ellipse"
              ellipseIconColor="#90EE90"
              style={styles.stepper}
              inputStyle={{ color: 'transparent' }}
              editable={false}
              onValueChange={this._changeDataTemp}
              max={80}
              stepValue={1}
              min={-15}
              value={this.state.valueM0}
            />
          </View>
        ) : (
          <View style={styles.areaAir}>
            <Text style={styles.titlekwh}>{Strings.getLang('manualtemp')}</Text>
            <View style={styles.title}>
              <FontAwesomeIcon icon={faWaveSquare} color="#90EE90" size={25} marginRight={10} />
              <Text style={styles.num}>
                {this.props.ReportProgTemp.substring(4, 6) === '81' ? '--' : ProgTempCli}
                °C
              </Text>
            </View>
          </View>
        )}
        <View style={styles.area}>
          <Text style={styles.titlekwh}>{Strings.getLang('fantitle')}</Text>
          <View style={styles.title}>
            <FontAwesomeIcon icon={faFan} color="#00e1ff" size={25} marginRight={10} />
            <Text style={styles.num}>{Strings.getLang(this.state.fan)}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.context}>Lo</Text>
            <TabBar
              activeColor="#00e1ff"
              type="radio"
              tabs={fan}
              activeKey={this.state.fan}
              onChange={this.changeDataFan}
              style={styles.bar}
              gutter={1}
            />
            <Text style={styles.context}>Hi</Text>
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
};

ClimateM.defaultProps = {
  FanSpeed: 'FAN_OFF',
  Zone: '010101',
  SetTemperature: '1E1E141414',
  ReportProgTemp: '001515',
  ModeChannel: '000000',
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
    height: 190,
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
    fontSize: 26,
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
    alignItems: 'center',
  },
  titlekwh: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 5,
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
  bar: {
    width: '70%',
    backgroundColor: '#f0f0f0',
    color: '#00e1ff',
    margin: 10,
  },
});

export default connect(({ dpState }) => ({
  FanSpeed: dpState[FanSpeedCode],
  Zone: dpState[ZoneCode],
  SetTemperature: dpState[SetTemperatureCode],
  ModeChannel: dpState[ModeChannelCode],
  ReportProgTemp: dpState[ReportProgTempCode],
}))(ClimateM);
