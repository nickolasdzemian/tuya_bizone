// мощность нагрузки для 1 зоны
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Slider, Stepper } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';

const loadcapacity10 = Strings.getLang('loadcapacity10');

export default class LoadCapacity1 extends Component {
  state = {
    value1: 0,
  };
  // функция выбора мощности (с округлением до целого числа)
  _handleComplete1 = value1 => {
    this.setState({ value1: Math.round(value1) });
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.title}>
          <FontAwesomeIcon icon={faBolt} color="#ffb700" size={25} />
          <Text style={styles.title}>{loadcapacity10}</Text>
        </View>
        <Text style={styles.buttontext}>{this.state.value1} W</Text>
        <Slider.Horizontal
          style={{ width: '90%' }}
          canTouchTrack={true}
          maximumValue={3500}
          minimumValue={0}
          value={this.state.value1}
          maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          minimumTrackTintColor="#ffb700"
          onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
          onSlidingComplete={this._handleComplete1}
          marginBottom={20}
        />
        <Stepper
          buttonType="ellipse"
          ellipseIconColor="#ffb700"
          inputStyle={{ color: 'transparent' }}
          style={{ paddingTop: 15, backgroundColor: '#fff' }}
          editable={false}
          onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
          max={3500}
          stepValue={1}
          min={0}
          value={this.state.value1}
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
