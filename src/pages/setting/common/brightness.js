import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { Backlight: BacklightCode } = dpCodes;

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

  getDataLight() {
    const { Backlight } = this.props;
    return Backlight;
  }

  get data() {
    return [
      {
        key: BacklightCode,
        title: brightnessText,
        onPress: () => {
          Popup.numberSelector({
            title: brightnessText,
            cancelText,
            confirmText,
            type: 'slider',
            value: this.getDataLight(),
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
          });
        },
      },
    ];
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 1 }} data={this.data} />;
  }
}

export default connect(({ dpState }) => ({
  Backlight: dpState[BacklightCode],
}))(BrightnessScene);
