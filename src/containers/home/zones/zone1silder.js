import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { TYSdk, Slider, Stepper } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { SetTemperature: SetTemperatureCode } = dpCodes;

class Zone1Silder extends PureComponent {
  static propTypes = {
    SetTemperature: PropTypes.string,
  };

  static defaultProps = {
    SetTemperature: '1E1E141414',
  };

  constructor(props) {
    super(props);
    const T = this.props.SetTemperature.slice(4, 6);
    const V = parseInt(T, 16);
    this.state = { valueZ1: V > 100 ? V - 256 : V };
  }

  getDataTemp() {
    const T = this.props.SetTemperature.substring(4, 6);
    const V = parseInt(T, 16);
    const valueZ1 = V > 100 ? V - 256 : V;
    return valueZ1;
  }

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

  render() {
    this.getDataTemp();
    this.setState();
    return (
      <SafeAreaView style={styles.container}>
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
    height: 160,
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
  SetTemperature: dpState[SetTemperatureCode],
}))(Zone1Silder);
