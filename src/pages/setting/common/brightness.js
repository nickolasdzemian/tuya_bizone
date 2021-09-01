import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { Backlight: BacklightCode, ClimateSelector: ClimateSelectorCode } = dpCodes;

const brightnessText = Strings.getLang('brightness');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class BrightnessScene extends Component {
  static propTypes = {
    Backlight: PropTypes.number,
  };

  static defaultProps = {
    Backlight: 1,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.area}
        activeOpacity={0.8}
        onPress={() =>
          Popup.numberSelector({
            title: brightnessText,
            cancelText,
            confirmText,
            type: 'slider',
            value: this.props.Backlight,
            maximumTrackTintColor: 'rgba(47, 47, 47, 0.5)',
            minimumTrackTintColor: '#FF7300',
            min: 0,
            max: 9,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              TYDevice.putDeviceData({
                [BacklightCode]: value,
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
          <FontAwesomeIcon icon={faSpinner} color="#333" size={18} />
          <TYText style={styles.items}>{brightnessText}</TYText>
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
    // backgroundColor: '#bbb',
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
  Backlight: dpState[BacklightCode],
  ClimateSelector: dpState[ClimateSelectorCode],
}))(BrightnessScene);
