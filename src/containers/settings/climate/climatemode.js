// выбор датчиков для климат-режима
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;

const { SensorSet3: SensorSet3Code } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
// const selected = Strings.getLang('selected');

const climatemodet = Strings.getLang('climatemodet');
const climatemode = Strings.getLang('climatemode');

// определение массива с режимами (для удобства режим = string)
const set = new Set([
  'air',
  'flour_1',
  'flour_1',
  'flour_2',
  'flour_12',
  'air_flour_1',
  'air_flour_2',
  'air_flour_12',
]);
Array.from(set);

class ClimateMode extends Component {
  static propTypes = {
    SensorSet3: PropTypes.string,
  };
  static defaultProps = {
    SensorSet3: 'air_flour_12',
  };
  state = {
    listValue: this.props.SensorSet3,
  };

  get data() {
    // разбор массива в список и вывод
    const tabRadios = Array.from(set).map(v => {
      return { key: `${v}`, title: `${Strings.getLang(v)}`, value: `${this.props.SensorSet3}` };
    });
    return [
      {
        key: 'Popup.list.radio',
        title: climatemodet,
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 7,
            dataSource: tabRadios,
            iconTintColor: '#90EE90',
            title: [climatemode],
            cancelText,
            confirmText,
            showBack: false,
            onBack: ({ close }) => {
              console.log('Select climate --none');
              close();
            },
            value: this.state.listValue,
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            // выбор режима по нажатию на него
            onSelect: (value, { close }) => {
              console.log('radio value :', value);
              this.setState({ listValue: value });
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

export default connect(({ dpState }) => ({
  SensorSet3: dpState[SensorSet3Code],
}))(ClimateMode);
