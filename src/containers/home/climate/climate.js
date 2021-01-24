// отображение всех элементов типа (report only)
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Slider, Stepper, TabBar, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFan, faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { FanSpeed: FanSpeedCode } = dpCodes;

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

class ClimateM extends React.PureComponent {
  static propTypes = {
    FanSpeed: PropTypes.string,
  };
  static defaultProps = {
    FanSpeed: 'FAN_OFF',
  };
  // в состояние данного конструктора вписываются значения datapoints,
  // от которых будет зависеть отображается тот или иной компонент
  // работает без DOM, отрисовка максимально быстрый
  constructor(props) {
    super(props);
    // if (this.datapoint.state) - условие
    this.stateCM = { isHidden: true };
    this.stateC = { isHidden: true };
    this.statePower = { isHidden: false };

    this.state = { valueM0: 0 };
    // this.state = { tab: 'FAN_OFF' };
  }

  getDataFan() {
    const { FanSpeed } = this.props;
    return FanSpeed;
  }

  changeDataFan = value => {
    // this.setState({ tab: value });
    TYDevice.putDeviceData({
      [FanSpeedCode]: value,
    });
  };

  _handleCompleteM0 = valueM0 => {
    this.setState({ valueM0: Math.round(valueM0) });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.stateCM.isHidden ? (
          <View style={styles.area}>
            <Text style={styles.titlekwh}>{Strings.getLang('manualtemp')}</Text>
            <View style={styles.title}>
              <FontAwesomeIcon icon={faHandPointUp} color="#90EE90" size={25} marginRight={10} />
              <Text style={styles.num}>{this.state.valueM0}°C</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.context}>-15</Text>
              <Slider.Horizontal
                style={styles.slider}
                canTouchTrack={true}
                maximumValue={80}
                minimumValue={-15}
                value={this.state.valueM0}
                maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                minimumTrackTintColor="#90EE90"
                onValueChange={valueM0 => this.setState({ valueM0: Math.round(valueM0) })}
                onSlidingComplete={this._handleCompleteM0}
              />
              <Text style={styles.context}>+80</Text>
            </View>
            <Stepper
              buttonType="ellipse"
              buttonStyle={{ size: 'small' }}
              ellipseIconColor="#90EE90"
              style={styles.stepper}
              inputStyle={{ color: 'transparent' }}
              editable={false}
              onValueChange={valueM0 => this.setState({ valueM0: Math.round(valueM0) })}
              max={80}
              stepValue={1}
              min={-15}
              value={this.state.valueM0}
            />
          </View>
        ) : null}
        <View style={styles.area}>
          <Text style={styles.titlekwh}>{Strings.getLang('fantitle')}</Text>
          <View style={styles.title}>
            <FontAwesomeIcon icon={faFan} color="#00e1ff" size={25} marginRight={10} />
            <Text style={styles.num}>{Strings.getLang(this.props.FanSpeed)}</Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.context}>Lo</Text>
            <TabBar
              activeColor="#00e1ff"
              type="radio"
              tabs={fan}
              activeKey={this.getDataFan()}
              onChange={this.changeDataFan}
              style={styles.bar}
              gutter={1}
            />
            <Text style={styles.context}>Hi</Text>
          </View>
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
    height: 155,
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
}))(ClimateM);
