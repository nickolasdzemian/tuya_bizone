/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import { Slider, Divider, Stepper, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const { TimerPreset: TimerPresetCode } = dpCodes;

const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

const tonePress = Strings.getLang('tonePress');
const ttwoPress = Strings.getLang('ttwoPress');
const tthreePress = Strings.getLang('tthreePress');
// const hrss = Strings.getLang('hrss');
// const minss = Strings.getLang('minss');

const convertMinsToTime = mins => {
  const hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

const convertMinsToTimeM = mins => {
  const hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

class ButtonsTimer2S extends Component {
  constructor(props) {
    super(props);
    const T = this.props.TimerPreset;
    const t1 = parseInt(T.substring(20, 24), 16);
    const t2 = parseInt(T.substring(16, 20), 16);
    const t3 = parseInt(T.substring(12, 16), 16);
    this.state = {
      value1: t1,
      value2: t2,
      value3: t3,
      apl: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.TimerPreset !== nextProps.TimerPreset) {
      this.setState({ apl: true });
      setTimeout(() => { this.setState({ apl: false }); }, 3000);
    }

    if (nextProps.TimerPreset) {
      this.setState({ apl: false });
    }
  }

  _handleComplete1 = value1 => {
    this.setState({ value1: Math.round(value1), apl: true });
    const TimerI = this.props.TimerPreset.substring(0, 20);
    const TimerII = this.props.TimerPreset.substring(24, 36);
    const Tset = Math.round(value1);
    const Tsend = Tset.toString(16);
    const Tfin =
      Tset < 16
        ? String(`${TimerI}000${Tsend}${TimerII}`)
        : Tset < 255 && Tset > 15
          ? String(`${TimerI}00${Tsend}${TimerII}`)
          : Tset < 1467 && Tset > 254
            ? String(`${TimerI}0${Tsend}${TimerII}`)
            : null;
    TYDevice.putDeviceData({
      [TimerPresetCode]: Tfin,
    });
    this.forceUpdate();
  };

  _handleComplete2 = value2 => {
    this.setState({ value2: Math.round(value2), apl: true });
    const TimerI = this.props.TimerPreset.substring(0, 16);
    const TimerII = this.props.TimerPreset.substring(20, 36);
    const Tset = Math.round(value2);
    const Tsend = Tset.toString(16);
    const Tfin =
      Tset < 16
        ? String(`${TimerI}000${Tsend}${TimerII}`)
        : Tset < 255 && Tset > 15
          ? String(`${TimerI}00${Tsend}${TimerII}`)
          : Tset < 1467 && Tset > 254
            ? String(`${TimerI}0${Tsend}${TimerII}`)
            : null;
    TYDevice.putDeviceData({
      [TimerPresetCode]: Tfin,
    });
    this.forceUpdate();
  };

  _handleComplete3 = value3 => {
    this.setState({ value3: Math.round(value3), apl: true });
    const TimerI = this.props.TimerPreset.substring(0, 12);
    const TimerII = this.props.TimerPreset.substring(16, 36);
    const Tset = Math.round(value3);
    const Tsend = Tset.toString(16);
    const Tfin =
      Tset < 16
        ? String(`${TimerI}000${Tsend}${TimerII}`)
        : Tset < 255 && Tset > 15
          ? String(`${TimerI}00${Tsend}${TimerII}`)
          : Tset < 1467 && Tset > 254
            ? String(`${TimerI}0${Tsend}${TimerII}`)
            : null;
    TYDevice.putDeviceData({
      [TimerPresetCode]: Tfin,
    });
    this.forceUpdate();
  };

  render() {
    const apl = this.state.apl;
    return (
      <View
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        {apl === true ? 
          <View>
            <ActivityIndicator size="large" color="#ff7300" /> 
          </View> : 
          windowHeight === 'normal' ?
            <View style={styles.title}>
              <FontAwesomeIcon icon={faClock} color="#ff7300" size={25} />
            </View> : null}
        <Text style={styles.buttontext}>
          {tonePress}
          {convertMinsToTime(this.state.value1)}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>0:01</Text>
          <Slider.Horizontal
            disabled={this.state.value2 === 2 || apl === true}
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value2 - 1}
            minimumValue={1}
            value={this.state.value1}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor={apl === true ? '#d0d0d0' : '#ff7300'}
            onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
            onSlidingComplete={this._handleComplete1}
          />
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value2 - 1)}</Text>
        </View>
        <Stepper
          disabled={apl}
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor={apl === true ? '#d0d0d0' : '#ff7300'}
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={this._handleComplete1}
          max={this.state.value2 - 1}
          stepValue={1}
          min={1}
          value={this.state.value1}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {ttwoPress}
          {convertMinsToTime(this.state.value2)}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value1 + 1)}</Text>
          <Slider.Horizontal
            disabled={(this.state.value3 - this.state.value1) === 2 || apl === true}
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value3 - 1}
            minimumValue={this.state.value1 + 1}
            value={this.state.value2}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor={apl === true ? '#d0d0d0' : '#ff7300'}
            onValueChange={value2 => this.setState({ value2: Math.round(value2) })}
            onSlidingComplete={this._handleComplete2}
          />
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value3 - 1)}</Text>
        </View>
        <Stepper
          disabled={apl}
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor={apl === true ? '#d0d0d0' : '#ff7300'}
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={this._handleComplete2}
          max={this.state.value3 - 1}
          stepValue={1}
          min={this.state.value1 + 1}
          value={this.state.value2}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {tthreePress}
          {convertMinsToTime(this.state.value3)}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value2 + 1)}</Text>
          <Slider.Horizontal
            disabled={(1440 - this.state.value2) === 1 || apl === true}
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={1440}
            minimumValue={this.state.value2 + 1}
            value={this.state.value3}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor={apl === true ? '#d0d0d0' : '#ff7300'}
            onValueChange={value3 => this.setState({ value3: Math.round(value3) })}
            onSlidingComplete={this._handleComplete3}
          />
          <Text style={styles.context}>24H</Text>
        </View>
        <Stepper
          disabled={apl}
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor={apl === true ? '#d0d0d0' : '#ff7300'}
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={this._handleComplete3}
          max={1440}
          stepValue={1}
          min={this.state.value2 + 1}
          value={this.state.value3}
        />
      </View>
    );
  }
}

ButtonsTimer2S.propTypes = {
  TimerPreset: PropTypes.string,
};

ButtonsTimer2S.defaultProps = {
  TimerPreset: '23180c1c180c1c180c',
};

const styles = StyleSheet.create({
  buttontext: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 3,
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
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
  TimerPreset: dpState[TimerPresetCode],
}))(ButtonsTimer2S);
