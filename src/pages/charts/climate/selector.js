/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { Divider, TimerPicker, Picker } from 'tuya-panel-kit';

export default class Selector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dutemps: _.range(-15, 81),
      stepperValue: 6,
      timeSelectionValue: 366,
    };
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 8,
        }}
      >
        <FontAwesomeIcon
          icon={faThermometerHalf}
          color="#474747"
          size={25}
          marginRight={20}
          marginLeft={10}
        />
        <Picker
          style={styles.tempPicker}
          // loop={true} - not working with iOS 14 and above
          itemStyle={styles.tempPicker}
          selectedValue={this.state.stepperValue}
          onValueChange={stepperValue =>
            this.setState({
              stepperValue: parseInt(stepperValue, 10),
            })}
        >
          {this.state.dutemps.map(stepperValue => (
            <Picker.Item
              style={styles.tempPicker}
              key={stepperValue}
              value={stepperValue}
              label={String(`${stepperValue} °C`)}
            />
          ))}
        </Picker>
        <Divider
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            height: 100,
            marginLeft: 20,
            margin: 20,
          }}
        />
        <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={25} />
        <TimerPicker
          style={styles.timerPicker}
          startTime={this.state.timeSelectionValue}
          is12Hours={false}
          singlePicker={true}
          onTimerChange={timeSelectionValue => this.setState({ timeSelectionValue })}
        />
      </View>);
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  item: {
    backgroundColor: '#fff',
    borderLeftColor: '#90EE90',
    borderRightColor: '#FF4040',
    borderLeftWidth: 10,
    borderRightWidth: 3,
    borderRadius: 20,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    color: 'black',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  inside: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  edit: {
    flexDirection: 'row',
    // backgroundColor: '#fff',
    width: '100%',
    height: 40,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 5,
    marginTop: 5,
    color: 'black',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  insideADD: {
    alignContent: 'center',
    alignItems: 'center',
  },
  tempPicker: {
    width: 70,
    height: 200,
  },
  timerPicker: {
    width: 200,
    height: 200,
  },
  list:{
    paddingBottom: 14,
  },
  divider: {
    flexDirection: 'column',
    height: 20,
  },
  title: {
    color: '#474747',
  },
  titleADD: {
    color: '#474747',
    fontSize: 12,
    marginTop: 2,
  },
  deletet: {
    fontWeight: 'bold',
    color: 'red',
    margin: 20,
  },
  info: {
    flexWrap: 'wrap',
    color: '#474747',
    textAlign: 'center',
    margin: 30,
    alignSelf: 'center',
    // justifyContent: 'space-around',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  annotation: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    paddingBottom: 10,
    letterSpacing: 1,
  },
  wait: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    paddingBottom: 1,
    letterSpacing: 1,
  },
});
  