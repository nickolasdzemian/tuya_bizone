// Зона 1 - выбор датчиков для работы
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;

const { SensorSet1: SensorSet1Code } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const climatemode = Strings.getLang('climatemode');
const zoneSens = Strings.getLang('zoneSens');

// определение массива с датчиками
const set = [
  {
    key: 'air',
    title: Strings.getLang('air'),
    value: 'air',
  },
  {
    key: 'flour',
    title: Strings.getLang('flour'),
    value: 'flour',
  },
  {
    key: 'air_flour',
    title: Strings.getLang('air_flour'),
    value: 'air_flour',
  },
];

class Zone1Mode extends Component {
  static propTypes = {
    SensorSet1: PropTypes.string,
  };
  static defaultProps = {
    SensorSet1: 'air_flour',
  };

  getDataSensors() {
    const { SensorSet1 } = this.props;
    return SensorSet1;
  }

  get data() {
    return [
      {
        key: this.getDataSensors(),
        title: zoneSens,
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 3,
            dataSource: set,
            iconTintColor: '#ffb700',
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
            // выбор и сохранение значения из списка по нажатию
            onSelect: (value, { close }) => {
              TYDevice.putDeviceData({
                [SensorSet1Code]: value,
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

export default connect(({ dpState }) => ({
  SensorSet1: dpState[SensorSet1Code],
}))(Zone1Mode);
