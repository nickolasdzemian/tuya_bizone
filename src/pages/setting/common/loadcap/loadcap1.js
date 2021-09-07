// отрисовка окна для выбора мощности нагрузки
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Divider, Slider, Stepper, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { Cache } from 'react-native-cache';
import Strings from '../../../../i18n';
import dpCodes from '../../../../config/dpCodes';

const { 
  PowerRate1: PowerRate1Code,
  PowerRate2: PowerRate2Code,
  ClimateSelector: ClimateSelectorCode,
  chSelector: chSelectorCode, 
} = dpCodes;

const cache = new Cache({
  namespace: 'Capacity',
  policy: {
    maxEntries: 50000
  },
  backend: AsyncStorage
});

class LoadCapacity0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value1: this.props.PowerRate1,
      value2: this.props.PowerRate2,
      cccc: this.props.ClimateSelector && !this.props.chSelector ? '1' : this.props.ClimateSelector && this.props.chSelector ? '2' : null,
    };
  }

  _handleComplete(value) {
    this.setState({ value1: Math.round(value) });
    cache.set('value1', value);
  }

  _handleComplete2(value) {
    this.setState({ value2: Math.round(value) });
    cache.set('value2', value);
  }

  render() {
    const CC = this.state.cccc;
    return (
      <ScrollView style={styles.main}>
        <View style={styles.pickerContainer}>
          <View style={styles.title}>
            <FontAwesomeIcon icon={faBolt} color={CC === '1' ? '#57BCFB' : '#ffb700'} size={25} />
            <TYText style={styles.title}>{Strings.getLang('loadcapacity10')}</TYText>
          </View>
          <TYText style={styles.buttontext}>{this.state.value1} W</TYText>
          <Slider.Horizontal
            style={{ width: '90%' }}
            canTouchTrack={true}
            maximumValue={3500}
            stepValue={1}
            minimumValue={1}
            value={this.state.value1}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor={CC === '1' ? '#57BCFB' : '#ffb700'}
            onValueChange={value => this.setState({ value1: Math.round(value) })}
            onSlidingComplete={value => this._handleComplete(value)}
            marginBottom={20}
          />
          <Stepper
            buttonType="ellipse"
            ellipseIconColor={CC === '1' ? '#57BCFB' : '#ffb700'}
            inputStyle={{ color: 'transparent' }}
            style={{ paddingTop: 15, backgroundColor: '#fff' }}
            editable={false}
            onValueChange={value => this._handleComplete(value)}
            max={3500}
            stepValue={1}
            min={1}
            value={this.state.value1}
          />
        </View>
        <Divider height={3} />
        <View style={styles.pickerContainer}>
          <View style={styles.title}>
            <FontAwesomeIcon icon={faBolt} color={CC === '1' ? '#ffb700' : CC === '2' ? '#57BCFB' : '#ff7300'} size={22} />
            <TYText style={styles.title}>{Strings.getLang('loadcapacity20')}</TYText>
          </View>
          <TYText style={styles.buttontext}>{this.state.value2} W</TYText>
          <Slider.Horizontal
            style={{ width: '90%' }}
            canTouchTrack={true}
            maximumValue={3500}
            stepValue={1}
            minimumValue={1}
            value={this.state.value2}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor={CC === '1' ? '#ffb700' : CC === '2' ? '#57BCFB' : '#ff7300'}
            onValueChange={value => this.setState({ value2: Math.round(value) })}
            onSlidingComplete={value => this._handleComplete2(value)}
          />
          <Stepper
            buttonType="ellipse"
            ellipseIconColor={CC === '1' ? '#ffb700' : CC === '2' ? '#57BCFB' : '#ff7300'}
            inputStyle={{ color: 'transparent' }}
            style={{ paddingTop: 15, backgroundColor: '#fff' }}
            editable={false}
            onValueChange={value => this._handleComplete2(value)}
            max={3500}
            stepValue={1}
            min={1}
            value={this.state.value2}
          />
        </View>
      </ScrollView>
    );
  }
}

LoadCapacity0.propTypes = {
  PowerRate1: PropTypes.number,
  PowerRate2: PropTypes.number,
  ClimateSelector: PropTypes.bool,
  chSelector: PropTypes.bool,
};
LoadCapacity0.defaultProps = {
  PowerRate1: 1000,
  PowerRate2: 1000,
  ClimateSelector: false,
  chSelector: false,
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
  },
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
  PowerRate2: dpState[PowerRate2Code],
  ClimateSelector: dpState[ClimateSelectorCode],
  chSelector: dpState[chSelectorCode],
}))(LoadCapacity0);
