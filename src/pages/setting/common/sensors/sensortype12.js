// выбор типа дачтика для 1 и 2 зоны
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Picker, TYSdk, TYText } from 'tuya-panel-kit';
import Strings from '../../../../i18n';
import dpCodes from '../../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { Detector1: Detector1Code, Detector2: Detector2Code } = dpCodes;

const sensortype1 = Strings.getLang('sensortype1');
const sensortype2 = Strings.getLang('sensortype2');

class PickSensorType1Scene extends Component {
  static propTypes = {
    Detector1: PropTypes.string,
    Detector2: PropTypes.string,
  };
  static defaultProps = {
    Detector1: 'Teplolux',
    Detector2: 'Teplolux',
  };

  constructor(props) {
    super(props);
    this.state = {
      // определение списков
      sensor1: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
      sensor2: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
    };
  }

  // функция получения текущ. знач.
  getDataS1() {
    const { Detector1 } = this.props;
    return Detector1;
  }

  getDataS2() {
    const { Detector2 } = this.props;
    return Detector2;
  }

  // функция выбора
  _handleChange1 = value1 => {
    TYDevice.putDeviceData({
      [Detector1Code]: value1,
    });
  };

  _handleChange2 = value2 => {
    TYDevice.putDeviceData({
      [Detector2Code]: value2,
    });
  };

  render = () => {
    return (
      <View style={styles.pickerContainer}>
        <View>
          <TYText style={styles.title}>{sensortype1}</TYText>
          <Picker
            loop={true}
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
            selectedValue={this.getDataS1()}
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
          <TYText style={styles.title}>{sensortype2}</TYText>
          <Picker
            loop={true}
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
            selectedValue={this.getDataS2()}
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

export default connect(({ dpState }) => ({
  Detector1: dpState[Detector1Code],
  Detector2: dpState[Detector2Code],
}))(PickSensorType1Scene);
