// выбор датчиков для климат-режима
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const { SensorSet3: SensorSet3Code } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const climatemodet = Strings.getLang('climatemodet');
const climatemode = Strings.getLang('climatemode');

// определение массива с режимами
const set = [
  {
    key: 'air',
    title: Strings.getLang('air'),
    value: 'air',
  },
  {
    key: 'flour_1',
    title: Strings.getLang('flour_1'),
    value: 'flour_1',
  },
  {
    key: 'flour_2',
    title: Strings.getLang('flour_2'),
    value: 'flour_2',
  },
  {
    key: 'flour_12',
    title: Strings.getLang('flour_12'),
    value: 'flour_12',
  },
  {
    key: 'air_flour_1',
    title: Strings.getLang('air_flour_1'),
    value: 'air_flour_1',
  },
  {
    key: 'air_flour_2',
    title: Strings.getLang('air_flour_2'),
    value: 'air_flour_2',
  },
  {
    key: 'air_flour_12',
    title: Strings.getLang('air_flour_12'),
    value: 'air_flour_12',
  },
];

class ClimateMode extends Component {
  getDataSensors() {
    const { SensorSet3 } = this.props;
    return SensorSet3;
  }

  get data() {
    return [
      {
        key: this.getDataSensors(),
        title: climatemodet,
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 7,
            dataSource: set,
            iconTintColor: '#90EE90',
            title: [climatemode],
            cancelText,
            confirmText,
            showBack: false,
            onBack: ({ close }) => {
              console.log('Select climate --none');
              close();
            },
            value: this.getDataSensors(),
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            // выбор режима по нажатию на него
            onSelect: (value, { close }) => {
              TYDevice.putDeviceData({
                [SensorSet3Code]: value,
              });
              // close();
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

ClimateMode.propTypes = {
  SensorSet3: PropTypes.string,
};
ClimateMode.defaultProps = {
  SensorSet3: 'air_flour_12',
};

export default connect(({ dpState }) => ({
  SensorSet3: dpState[SensorSet3Code],
}))(ClimateMode);
