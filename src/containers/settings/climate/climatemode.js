// выбор датчиков для климат-режима
import React, { Component } from 'react';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
// const selected = Strings.getLang('selected');

const climatemodet = Strings.getLang('climatemodet');
const climatemode = Strings.getLang('climatemode');

// определение переводов для каждого режима
const air = Strings.getLang('air');
const flour1 = Strings.getLang('flour1');
const flour2 = Strings.getLang('flour2');
const airflour1 = Strings.getLang('airflour1');
const airflour2 = Strings.getLang('airflour2');
const flour12 = Strings.getLang('flour12');
const airflour12 = Strings.getLang('airflour12');

// определение массива с режимами
const set = new Set([air, flour1, flour2, flour12, airflour1, airflour2, airflour12]);
Array.from(set);

// разбор массива в список
const tabRadios = Array.from(set).map(v => {
  return { key: `${v}`, title: `${v}`, value: `${v}` };
});

export default class ClimateMode extends Component {
  state = {
    listValue: airflour12,
  };

  get data() {
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
