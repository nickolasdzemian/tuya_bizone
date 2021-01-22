// Зона 1 - выбор датчиков для работы
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYFlatList, Popup, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;

const { SensorSet1: SensorSet1Code } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
// const selected = Strings.getLang('selected');

const climatemode = Strings.getLang('climatemode');
const zoneSens = Strings.getLang('zoneSens');

// определение массива данных
const set = new Set(['air', 'flour', 'air_flour']);
Array.from(set);

// разбор массива и вывод списка и селектора
const tabRadios = Array.from(set).map(v => {
  return { key: `${v}`, title: `${Strings.getLang(v)}`, value: `${v}` };
});

class Zone1Mode extends Component {
  state = {
    // инициализированное значение
    listValue: 'air_flour_1',
  };

  get data() {
    return [
      {
        key: 'Popup.list.radio',
        title: zoneSens,
        onPress: () => {
          Popup.list({
            type: 'radio',
            maxItemNum: 3,
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
