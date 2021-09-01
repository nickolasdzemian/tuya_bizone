import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWind, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { TemperatureCorr: TemperatureCorrCode, ClimateSelector: ClimateSelectorCode } = dpCodes;

const aircorr = Strings.getLang('aircorr');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class AirCorrScene extends Component {
  static propTypes = {
    TemperatureCorr: PropTypes.number,
  };
  static defaultProps = {
    TemperatureCorr: 0,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  getDataCorr() {
    const { TemperatureCorr } = this.props;
    return TemperatureCorr;
  }

  get data() {
    return [
      {
        key: TemperatureCorrCode,
        title: aircorr,
        onPress: () => {
          Popup.numberSelector({
            title: aircorr,
            cancelText,
            confirmText,
            type: 'slider',
            value: this.getDataCorr(),
            maximumTrackTintColor: 'rgba(47, 47, 47, 0.5)',
            minimumTrackTintColor: '#FF7300',
            min: -9,
            max: 9,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              TYDevice.putDeviceData({
                [TemperatureCorrCode]: value,
              });
              if (value < 11) {
                close();
              } else {
                return false;
              }
            },
          });
        },
      },
    ];
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.area}
        activeOpacity={0.8}
        onPress={() =>
          Popup.numberSelector({
            title: `${aircorr}, °C`,
            cancelText,
            confirmText,
            type: 'slider',
            value: this.getDataCorr(),
            maximumTrackTintColor: '#ff7300',
            minimumTrackTintColor: '#00d0ff',
            min: -9,
            max: 9,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              TYDevice.putDeviceData({
                [TemperatureCorrCode]: value,
              });
              if (value < 11) {
                close();
              } else {
                return false;
              }
            },
          })}
      >
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faWind} color="#333" size={18} />
          <TYText style={styles.items}>{aircorr}</TYText>
        </View>
        <View style={styles.area0}>
          <FontAwesomeIcon 
            icon={faChevronRight} 
            color={this.props.ClimateSelector === true ? '#666' : '#ff7300'} 
            size={15}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    // backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  area0: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  items: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  TemperatureCorr: dpState[TemperatureCorrCode],
  ClimateSelector: dpState[ClimateSelectorCode],
}))(AirCorrScene);
