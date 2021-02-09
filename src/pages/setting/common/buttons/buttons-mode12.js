// назначение режимов для 1 и 2 кнопки
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from 'tuya-panel-kit';
import Strings from '../../../../i18n';

// определение переводов для режимов
const buttonsmodenametimer = Strings.getLang('buttonsmodenametimer');
const buttonsmodenamemode = Strings.getLang('buttonsmodenamemode');
const buttonsmodenametemp = Strings.getLang('buttonsmodenametemp');
const buttonsmodetap1 = Strings.getLang('buttonsmodetap1');
const buttonsmodetap2 = Strings.getLang('buttonsmodetap2');

export default class ButtonMode12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // список режимов для 1 кнопки
      button1: [buttonsmodenametimer, buttonsmodenamemode, buttonsmodenametemp],
      // значение по умолчанию
      value1: buttonsmodenamemode,
      button2: [buttonsmodenametimer, buttonsmodenamemode, buttonsmodenametemp],
      // список режимов для 2 кнопки
      value2: buttonsmodenamemode,
      // значение по умолчанию
    };
  }
  // функция выбора в селекторе
  _handleChange1 = value1 => {
    this.setState({ value1 });
    console.log(value1);
  };
  // //
  _handleChange2 = value2 => {
    this.setState({ value2 });
    console.log(value2);
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View>
          <Text style={styles.title}>{buttonsmodetap1}</Text>
          <Picker
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.value1}
            onValueChange={this._handleChange1}
            selectedItemTextColor="#ffb700"
          >
            {this.state.button1.map(value1 => (
              <Picker.Item key={value1} value={value1} label={value1} />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.title}>{buttonsmodetap2}</Text>
          <Picker
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.value2}
            onValueChange={this._handleChange2}
            selectedItemTextColor="#FF7300"
          >
            {this.state.button2.map(value2 => (
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
    marginVertical: 5,
    height: 160,
    width: 150,
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
