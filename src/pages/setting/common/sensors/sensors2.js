// окно выбора типов датчиков
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Popup, Divider, TYText, Picker, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf, faInfoCircle, faStethoscope, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';
import dpCodes from '../../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { Detector2: Detector2Code } = dpCodes;

const sensortype2 = Strings.getLang('sensortype2');

const sensorstype = Strings.getLang('sensorstype');
const sensortype0 = Strings.getLang('sensortype0');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class SensorsTypeZ2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // определение списков
      sensor2: ['AuBe', 'Warmup', 'Teplolux', 'DEVI', 'Eberle', 'Ensto'],
      s2s: this.props.Detector2,
    };
  }

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
                  Teploluxe 6.8 kΩ 
                  {' '}
                  {'\n'}
                  AuBe 10 kΩ 
                  {' '}
                  {'\n'}
                  DEVI 15 kΩ 
                  {' '}
                  {'\n'}
                  Eberle 33 kΩ 
                  {' '}
                  {'\n'}
                  Ensto 47 kΩ 
                  {' '}
                  {'\n'}
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
                [Detector2Code]: this.state.s2s,
              });
              close();
            },
          })}
      >
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faStethoscope} color="#FF7300" size={20} />
          <TYText style={styles.items}>{sensorstype}</TYText>
        </View>
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faChevronRight} color="#666" size={15} marginRight={10} />
        </View>
      </TouchableOpacity>
    );
  }
}

SensorsTypeZ2.propTypes = {
  Detector2: PropTypes.string,
};
SensorsTypeZ2.defaultProps = {
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
    marginLeft: 22,
    margin: 14,
    marginTop: 8 + 14,
    marginBottom: 8 + 14 + 35,
    justifyContent: 'space-between',
  },
  area0: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  items: {
    marginLeft: 14,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  Detector2: dpState[Detector2Code],
}))(SensorsTypeZ2);
