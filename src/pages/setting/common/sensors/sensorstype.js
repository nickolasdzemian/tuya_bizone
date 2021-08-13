// окно выбора типов датчиков
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Popup, Divider, TYText, Picker, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faInfoCircle, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';
import dpCodes from '../../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { Detector1: Detector1Code, Detector2: Detector2Code } = dpCodes;

const sensortype1 = Strings.getLang('sensortype1');
const sensortype2 = Strings.getLang('sensortype2');

const sensorstype = Strings.getLang('sensorstype');
const sensortype0 = Strings.getLang('sensortype0');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class SensorsType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // определение списков
      sensor1: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
      s1s: this.props.Detector1,
      sensor2: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
      s2s: this.props.Detector2,
    };
  }

  // функция выбора
  _handleChange1 = value1 => {
    this.setState({ s1s: value1 });
  };

  _handleChange2 = value2 => {
    this.setState({ s2s: value2 });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.area}
        activeOpacity={0.8}
        onPress={() =>
          Popup.custom({
            content: (
              <View style={{ backgroundColor: '#fff', height: 410 }}>
                <View style={styles.pickerContainer}>
                  <View>
                    <FontAwesomeIcon
                      icon={faThermometerHalf}
                      color="#ffb700"
                      size={25}
                      alignSelf="center"
                      marginBottom={5}
                    />
                    <TYText style={styles.title2}>{sensortype1}</TYText>
                    {/* <TYText style={[styles.title2, {fontSize: 14, color: '#666'}]}>{Strings.getLang('Nz1')}</TYText> */}
                    <Divider />
                    <Picker
                      loop={true}
                      style={[styles.picker]}
                      itemStyle={styles.pickerItem}
                      selectedValue={this.state.s1s}
                      onValueChange={this._handleChange1}
                      selectedItemTextColor="#ffb700"
                      theme={{ fontSize: 16 }}
                    >
                      {/* выбор значения из предоставленного массива */}
                      {this.state.sensor1.map(value1 => (
                        <Picker.Item key={value1} value={value1} label={value1} />
                      ))}
                    </Picker>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      icon={faThermometerHalf}
                      color="#FF7300"
                      size={25}
                      alignSelf="center"
                      marginBottom={5}
                    />
                    <TYText style={styles.title2}>{sensortype2}</TYText>
                    <Divider />
                    <Picker
                      loop={true}
                      style={[styles.picker]}
                      itemStyle={styles.pickerItem}
                      selectedValue={this.state.s2s}
                      onValueChange={this._handleChange2}
                      selectedItemTextColor="#FF7300"
                      theme={{ fontSize: 16 }}
                    >
                      {this.state.sensor2.map(value2 => (
                        <Picker.Item key={value2} value={value2} label={value2} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <Divider />
                <FontAwesomeIcon icon={faInfoCircle} size={16} margin={10} alignSelf="center" />
                <TYText style={styles.title}>
                  Teploluxe 6.8 kΩ {'\n'}
                  AuBe 10 kΩ {'\n'}
                  DEVI 15 kΩ {'\n'}
                  Eberle 33 kΩ {'\n'}
                  Ensto 47 kΩ {'\n'}
                  Warmup 12 kΩ
                </TYText>
              </View>
            ),
            title: sensortype0,
            cancelText,
            confirmText,
            onMaskPress: ({ close }) => {
              this.setState({ s1s: this.props.Detector1, s2s: this.props.Detector2 });
              close();
            },
            onCancel: () => {
              this.setState({ s1s: this.props.Detector1, s2s: this.props.Detector2 });
              Popup.close();
            },
            onConfirm: (value, { close }) => {
              TYDevice.putDeviceData({
                [Detector1Code]: this.state.s1s,
                [Detector2Code]: this.state.s2s,
              });
              close();
            },
          })}
      >
        <FontAwesomeIcon icon={faStethoscope} color="#FF7300" size={18} />
        <TYText style={styles.items}>{sensorstype}</TYText>
      </TouchableOpacity>
    );
  }
}

SensorsType.propTypes = {
  Detector1: PropTypes.string,
  Detector2: PropTypes.string,
};
SensorsType.defaultProps = {
  Detector1: 'Teplolux',
  Detector2: 'Teplolux',
};

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    // marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
  },
  picker: {
    height: 180,
    width: 100,
  },
  pickerItem: {
    fontFamily: 'System',
    fontSize: 18,
  },
  title2: {
    fontFamily: 'System',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 20,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'System',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    paddingBottom: 10,
    letterSpacing: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  items: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  Detector1: dpState[Detector1Code],
  Detector2: dpState[Detector2Code],
}))(SensorsType);
