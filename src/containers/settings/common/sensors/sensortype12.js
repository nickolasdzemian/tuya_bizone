// выбор типа дачтика для 1 и 2 зоны
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from 'tuya-panel-kit';
import Strings from '../../../../i18n';

const sensortype1 = Strings.getLang('sensortype1');
const sensortype2 = Strings.getLang('sensortype2');

export default class PickSensorType1Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // определение списков
      sensor1: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
      value1: 'Teplolux',
      sensor2: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
      value2: 'Teplolux',
    };
  }
  // функция выбора с логированием
  _handleChange1 = value1 => {
    this.setState({ value1 });
    console.log(value1);
  };

  _handleChange2 = value2 => {
    this.setState({ value2 });
    console.log(value2);
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View>
          <Text style={styles.title}>{sensortype1}</Text>
          <Picker
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.value1}
            onValueChange={this._handleChange1}
            selectedItemTextColor="#ffb700"
          >
            {/* выбор значения из предоставленного массива */}
            {this.state.sensor1.map(value1 => (
              <Picker.Item key={value1} value={value1} label={value1} />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.title}>{sensortype2}</Text>
          <Picker
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.value2}
            onValueChange={this._handleChange2}
            selectedItemTextColor="#FF7300"
          >
            {this.state.sensor2.map(value2 => (
              <Picker.Item key={value2} value={value2} label={value2} />
            ))}
          </Picker>
        </View>
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
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
  },

  // tip: {
  //   fontSize: 15,
  //   color: 'black',
  // },

  picker: {
    marginVertical: 0,
    height: 188,
    width: 100,
  },

  pickerItem: {},

  title: {
    marginTop: 1,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
