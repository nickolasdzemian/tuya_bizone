import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Slider, Divider, Stepper } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';

const tonePress = Strings.getLang('tonePress');
const ttwoPress = Strings.getLang('ttwoPress');
const tthreePress = Strings.getLang('tthreePress');

export default class ButtonsTemp2S extends Component {
  state = {
    value4: -15,
    value5: 30,
    value6: 80,
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
          <FontAwesomeIcon icon={faTemperatureLow} color="#FF7300" size={25} />
        </View>
        <Text style={styles.buttontext}>
          {this.state.value4}°C
          {tonePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>-15</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value5 - 1}
            minimumValue={-15}
            value={this.state.value4}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#FF7300"
            onValueChange={value4 => this.setState({ value4: Math.round(value4) })}
            onSlidingComplete={this._handleComplete4}
          />
          <Text style={styles.context}> {this.state.value5}</Text>
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
          min={-15}
          value={this.state.value4}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {this.state.value5}°C
          {ttwoPress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{this.state.value4}</Text>
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
          <Text style={styles.context}> {this.state.value6}</Text>
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
          {this.state.value6}°C
          {tthreePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{this.state.value5}</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={80}
            minimumValue={this.state.value5 + 1}
            value={this.state.value6}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#FF7300"
            onValueChange={value6 => this.setState({ value6: Math.round(value6) })}
            onSlidingComplete={this._handleComplete6}
          />
          <Text style={styles.context}> 80</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#FF7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value6 => this.setState({ value6: Math.round(value6) })}
          max={80}
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
