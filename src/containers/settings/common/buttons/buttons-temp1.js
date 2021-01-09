// настройка температур для 1 кнопки
import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Slider, Divider, Stepper } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
// import { NumberUtils } from 'tuya-panel-kit/src/utils';
import Strings from '../../../../i18n';

const tonePress = Strings.getLang('tonePress');
const ttwoPress = Strings.getLang('ttwoPress');
const tthreePress = Strings.getLang('tthreePress');

// const { add, subtract } = NumberUtils;

export default class ButtonsTemp1S extends Component {
  state = {
    // изначальное положение
    value1: -15,
    value2: 30,
    value3: 80,
  };
  // функция выбора 1 значения (с округлением до целого числа)
  _handleComplete1 = value1 => {
    this.setState({ value1: Math.round(value1) });
  };

  // Математическое недопущение перекрывающих крайних пределов - работает только на кнопках
  // _handleMath1 = isMinus => {
  //   const min = -15;
  //   const max = this.state.value2;
  //   const onValueChange = value1 => this.setState({ value1: Math.round(value1) });
  //   const stepValue = 1;
  //   const { value1 } = this.state;
  //   if (isMinus) {
  //     if (value1 > min) {
  //       const step = Math.min(stepValue, subtract(value1, min));
  //       onValueChange && onValueChange(subtract(value1, step));
  //       this.setState({
  //         value1: subtract(value1, step),
  //       });
  //     }
  //   } else if (value1 <= max) {
  //     const step = Math.min(stepValue, subtract(max, value1));
  //     onValueChange && onValueChange(add(value1, step));
  //     this.setState({
  //       value1: add(value1, step),
  //     });
  //   }
  // };
  // функция выбора 2 значения
  _handleComplete2 = value2 => {
    this.setState({ value2: Math.round(value2) });
  };
  // функция выбора 3 значения
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
          <FontAwesomeIcon icon={faTemperatureLow} color="#ffb700" size={25} />
        </View>
        <Text style={styles.buttontext}>
          {this.state.value1}°C
          {tonePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>-15</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value2 - 1}
            minimumValue={-15}
            value={this.state.value1}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ffb700"
            onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
            onSlidingComplete={this._handleComplete1}
          />
          <Text style={styles.context}> {this.state.value2}</Text>
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
          min={-15}
          value={this.state.value1}
        />
        <Divider />
        <Text style={styles.buttontext}>
          {this.state.value2}°C
          {ttwoPress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{this.state.value1}</Text>
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
          <Text style={styles.context}> {this.state.value3}</Text>
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
          {this.state.value3}°C
          {tthreePress}
        </Text>
        <View style={styles.title}>
          <Text style={styles.context}>{this.state.value2}</Text>
          <Slider.Horizontal
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={80}
            minimumValue={this.state.value2 + 1}
            value={this.state.value3}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ffb700"
            onValueChange={value3 => this.setState({ value3: Math.round(value3) })}
            onSlidingComplete={this._handleComplete3}
          />
          <Text style={styles.context}> 80</Text>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ffb700"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={value3 => this.setState({ value3: Math.round(value3) })}
          max={80}
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
