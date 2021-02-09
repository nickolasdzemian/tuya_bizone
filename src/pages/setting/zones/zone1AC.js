/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
// мощность нагрузки для 1 зоны
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;
const { SetTemperature: SetTemperatureCode } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class Zone1Air extends Component {
  constructor(props) {
    super(props);
    const T = props.SetTemperature.substring(0, 2);
    const V = parseInt(T, 16);
    // eslint-disable-next-line react/no-unused-state
    this.state = { value: V > 100 ? V - 256 : V };
  }

  getDataTemp() {
    const T = this.props.SetTemperature.substring(0, 2);
    const V = parseInt(T, 16);
    const value = V > 100 ? V - 256 : V;
    return value;
  }

  get data() {
    return [
      {
        key: this.SetTemperatureCode,
        title: Strings.getLang('air_limit'),
        onPress: () => {
          Popup.numberSelector({
            title: Strings.getLang('air_limit'),
            cancelText,
            confirmText,
            type: 'slider',
            value: this.getDataTemp(),
            maximumTrackTintColor: 'rgba(47, 47, 47, 0.5)',
            minimumTrackTintColor: '#ffb700',
            min: -15,
            step: 1,
            max: 80,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              const I = this.props.SetTemperature.substring(2, 10);
              const Tset = Math.round(value);
              // плявит
              const Tsend = Tset.toString(16);
              const ZorroOne = '0';
              const Tfin = Tset < 16 ? String(ZorroOne + Tsend + I) : String(Tsend + I);
              // не плявит, ибо 0
              const Zorro = '00';
              const Tfin0 = String(Zorro + I);
              // плявит обратно, ибо не 0 и не плявит
              const Tminus = 256 + Tset;
              const TsendMinus = Tminus.toString(16);
              const TfinMin = String(TsendMinus + I);
              // eslint-disable-next-line no-unused-expressions
              Tset > 0
                ? TYDevice.putDeviceData({
                  [SetTemperatureCode]: Tfin,
                })
                : Tset === 0
                  ? TYDevice.putDeviceData({
                    [SetTemperatureCode]: Tfin0,
                  })
                  : Tset < 0
                    ? TYDevice.putDeviceData({
                      [SetTemperatureCode]: TfinMin,
                    })
                    : null;
              if (value < 81) {
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

Zone1Air.propTypes = {
  SetTemperature: PropTypes.string,
};

Zone1Air.defaultProps = {
  SetTemperature: '1E1E141414',
};

export default connect(({ dpState }) => ({
  SetTemperature: dpState[SetTemperatureCode],
}))(Zone1Air);
