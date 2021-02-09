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

export default class ButtonsTimer2S extends Component {
  state = {
    value4: 0,
    value5: 700,
    value6: 1440,
  };

  _handleComplete4 = value4 => {
    this.setState({ value4: Math.round(value4) });
  };

  _handleComplete5 = value5 => {
    this.setState({ value5: Math.round(value5) });
  };

  _handleComplete6 = value6 => {
    this.setState({ value6: Math.round(value6) });
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
          <FontAwesomeIcon icon={faClock} color="#FF7300" size={25} />
        </View>
        <Text style={styles.buttontext}>
          {convertMinsToTime(this.state.value4)}
          {tonePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>0</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value5 - 1}
            minimumValue={0}
            value={this.state.value4}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#FF7300"
            onValueChange={value4 => this.setState({ value4: Math.round(value4) })}
            onSlidingComplete={this._handleComplete4}
          />
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value5)}</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#FF7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value4 => this.setState({ value4: Math.round(value4) })}
          max={this.state.value5 - 1}
          stepValue={1}
          min={0}
          value={this.state.value4}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {convertMinsToTime(this.state.value5)}
          {ttwoPress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value4)}</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value6 - 1}
            minimumValue={this.state.value4 + 1}
            value={this.state.value5}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#FF7300"
            onValueChange={value5 => this.setState({ value5: Math.round(value5) })}
            onSlidingComplete={this._handleComplete5}
          />
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value6)}</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#FF7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value5 => this.setState({ value5: Math.round(value5) })}
          max={this.state.value6 - 1}
          stepValue={1}
          min={this.state.value4 + 1}
          value={this.state.value5}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {convertMinsToTime(this.state.value6)}
          {tthreePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{convertMinsToTimeM(this.state.value5)}</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={1440}
            minimumValue={this.state.value5 + 1}
            value={this.state.value6}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#FF7300"
            onValueChange={value6 => this.setState({ value6: Math.round(value6) })}
            onSlidingComplete={this._handleComplete6}
          />
          <Text style={styles.context}>24H</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#FF7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value6 => this.setState({ value6: Math.round(value6) })}
          max={1440}
          stepValue={1}
          min={this.state.value5 + 1}
          value={this.state.value6}
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
