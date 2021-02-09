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
const { PowerRate2: PowerRate2Code } = dpCodes;

class LoadCapacity2 extends Component {
  static propTypes = {
    PowerRate2: PropTypes.number,
  };
  static defaultProps = {
    PowerRate2: 1000,
  };
  state = {
    value: this.props.PowerRate2,
  };

  _handleComplete = value => {
    this.setState({ value: Math.round(value) });
    TYDevice.putDeviceData({
      [PowerRate2Code]: value,
    });
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.title}>
          <FontAwesomeIcon icon={faBolt} color="#FF7300" size={22} />
          <Text style={styles.title}>{Strings.getLang('loadcapacity20')}</Text>
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
          minimumTrackTintColor="#FF7300"
          onValueChange={value => this.setState({ value: Math.round(value) })}
          onSlidingComplete={this._handleComplete}
        />
        <Stepper
          buttonType="ellipse"
          ellipseIconColor="#FF7300"
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
  PowerRate2: dpState[PowerRate2Code],
}))(LoadCapacity2);
