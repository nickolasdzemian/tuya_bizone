// мощность нагрузки для 1 зоны
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { Slider, Stepper, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';
import dpCodes from '../../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { PowerRate1: PowerRate1Code } = dpCodes;

class LoadCapacity1 extends Component {
  static propTypes = {
    PowerRate1: PropTypes.number,
  };
  static defaultProps = {
    PowerRate1: 1000,
  };
  state = {
    value: this.props.PowerRate1,
  };

  // функция выбора мощности (с округлением до целого числа)
  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
    TYDevice.putDeviceData({
      [PowerRate1Code]: value,
    });
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.title}>
          <FontAwesomeIcon icon={faBolt} color="#ffb700" size={25} />
          <Text style={styles.title}>{Strings.getLang('loadcapacity10')}</Text>
        </View>
        <Text style={styles.buttontext}>{this.state.value} W</Text>
        <Slider.Horizontal
          style={{ width: '90%' }}
          canTouchTrack={true}
          maximumValue={3500}
          stepValue={1}
          minimumValue={0}
          value={this.state.value}
          maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
          minimumTrackTintColor="#ffb700"
          onValueChange={value => this.setState({ value: Math.round(value) })}
          onSlidingComplete={this._handleComplete}
          marginBottom={20}
        />
        <Stepper
          buttonType="ellipse"
          ellipseIconColor="#ffb700"
          inputStyle={{ color: 'transparent' }}
          style={{ paddingTop: 15, backgroundColor: '#fff' }}
          editable={false}
          onValueChange={this._handleComplete}
          max={3500}
          stepValue={1}
          min={0}
          value={this.state.value}
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

export default connect(({ dpState }) => ({
  PowerRate1: dpState[PowerRate1Code],
}))(LoadCapacity1);
