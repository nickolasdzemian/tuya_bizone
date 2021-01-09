import React, { Component } from 'react';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
// const selected = Strings.getLang('selected');

const climatemode = Strings.getLang('climatemode');
const zoneSens = Strings.getLang('zoneSens');

const air = Strings.getLang('air');
const flour2 = Strings.getLang('flour2');
const airflour2 = Strings.getLang('airflour2');

const set = new Set([air, flour2, airflour2]);
Array.from(set);

const tabRadios = Array.from(set).map(v => {
  return { key: `${v}`, title: `${v}`, value: `${v}` };
});

export default class Zone2Mode extends Component {
  state = {
    listValue: airflour2,
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
            dataSource: tabRadios,
            iconTintColor: '#FF7300',
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
