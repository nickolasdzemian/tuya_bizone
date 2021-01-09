import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Slider, Stepper } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';

const loadcapacity20 = Strings.getLang('loadcapacity20');

export default class LoadCapacity2 extends Component {
  state = {
    value2: 0,
  };

  _handleComplete2 = value2 => {
    this.setState({ value2: Math.round(value2) });
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.title}>
          <FontAwesomeIcon icon={faBolt} color="#FF7300" size={22} />
          <Text style={styles.title}>{loadcapacity20}</Text>
        </View>
        <Text style={styles.buttontext}>{this.state.value2} W</Text>
        <Slider.Horizontal
          style={{ width: '90%' }}
          canTouchTrack={true}
          maximumValue={3500}
          minimumValue={0}
          value={this.state.value2}
          maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          minimumTrackTintColor="#FF7300"
          onValueChange={value2 => this.setState({ value2: Math.round(value2) })}
          onSlidingComplete={this._handleComplete2}
        />
        <Stepper
          buttonType="ellipse"
          ellipseIconColor="#FF7300"
          inputStyle={{ color: 'transparent' }}
          style={{ paddingTop: 15, backgroundColor: '#fff' }}
          editable={false}
          onValueChange={value2 => this.setState({ value2: Math.round(value2) })}
          max={3500}
          stepValue={1}
          min={0}
          value={this.state.value2}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  pickerContainer: {
    // height: 188,
    flex: 1,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  buttontext: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 32,
    color: 'black',
    fontWeight: '500',
  },

  title: {
    marginTop: 0,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
