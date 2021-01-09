// Зона 1 - выбор датчиков для работы
import React, { Component } from 'react';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
// const selected = Strings.getLang('selected');

const climatemode = Strings.getLang('climatemode');
const zoneSens = Strings.getLang('zoneSens');

const air = Strings.getLang('air');
const flour1 = Strings.getLang('flour1');
const airflour1 = Strings.getLang('airflour1');

// определение массива данных с переводом
const set = new Set([air, flour1, airflour1]);
Array.from(set);

// разбор массива и вывод списка и селектора
const tabRadios = Array.from(set).map(v => {
  return { key: `${v}`, title: `${v}`, value: `${v}` };
});

export default class Zone1Mode extends Component {
  state = {
    // инициализированное значение
    listValue: airflour1,
  };

  get data() {
    return [
      {
        key: 'Popup.list.radio',
        title: zoneSens,
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 7,
            dataSource: tabRadios, // сорцы для данных - можно вставить state из массива прям сюда
            iconTintColor: '#ffb700',
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
            // выбор и сохранение значения из списка по нажатию
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
