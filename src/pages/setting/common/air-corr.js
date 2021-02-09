import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;
const { TemperatureCorr: TemperatureCorrCode } = dpCodes;

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
    return <TYFlatList contentContainerStyle={{ paddingTop: 1 }} data={this.data} />;
  }
}

export default connect(({ dpState }) => ({
  TemperatureCorr: dpState[TemperatureCorrCode],
}))(AirCorrScene);
