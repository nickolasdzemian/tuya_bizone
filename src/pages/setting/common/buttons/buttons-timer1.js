import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Slider, Divider, Stepper } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';

const tonePress = Strings.getLang('tonePress');
const ttwoPress = Strings.getLang('ttwoPress');
const tthreePress = Strings.getLang('tthreePress');
const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');

const convertMinsToTime = mins => {
  const hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}${hrss}:${minutes}${minss}`;
};

const convertMinsToTimeM = mins => {
  const hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

export default class ButtonsTimer1S extends Component {
  state = {
    value1: 0,
    value2: 700,
    value3: 1440,
  };

  _handleComplete1 = value1 => {
    this.setState({ value1: Math.round(value1) });
  };

  _handleComplete2 = value2 => {
    this.setState({ value2: Math.round(value2) });
  };

  _handleComplete3 = value3 => {
    this.setState({ value3: Math.round(value3) });
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 0.5,
          marginTop: 10,
        }}
      >
        <View style={styles.title}>
          <FontAwesomeIcon icon={faClock} color="#ffb700" size={25} />
        </View>
        <Text style={styles.buttontext}>
          {convertMinsToTime(this.state.value1)}
          {tonePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>0</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value2 - 1}
            minimumValue={0}
            value={this.state.value1}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ffb700"
            onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
            onSlidingComplete={this._handleComplete1}
          />
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value2)}</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ffb700"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
          max={this.state.value2 - 1}
          stepValue={1}
          min={0}
          value={this.state.value1}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {convertMinsToTime(this.state.value2)}
          {ttwoPress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value1)}</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value3 - 1}
            minimumValue={this.state.value1 + 1}
            value={this.state.value2}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ffb700"
            onValueChange={value2 => this.setState({ value2: Math.round(value2) })}
            onSlidingComplete={this._handleComplete2}
          />
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value3)}</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ffb700"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value2 => this.setState({ value2: Math.round(value2) })}
          max={this.state.value3 - 1}
          stepValue={1}
          min={this.state.value1 + 1}
          value={this.state.value2}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {convertMinsToTime(this.state.value3)}
          {tthreePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value2)}</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={1440}
            minimumValue={this.state.value2 + 1}
            value={this.state.value3}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ffb700"
            onValueChange={value3 => this.setState({ value3: Math.round(value3) })}
            onSlidingComplete={this._handleComplete3}
          />
          <Text style={styles.context}>24H</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ffb700"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value3 => this.setState({ value3: Math.round(value3) })}
          max={1440}
          stepValue={1}
          min={this.state.value2 + 1}
          value={this.state.value3}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttontext: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
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
