// всплывающее окошко с выбором режимов для кнопок
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../../i18n';
import ButtonsModeS from './buttons-main12';

const buttonsmodetap0 = Strings.getLang('buttonsmodetap0');
const buttonsmodetitle2 = Strings.getLang('buttonsmodetitle2');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

export default class ButtonSet extends Component {
  get data() {
    return [
      {
        key: 'custom',
        title: buttonsmodetap0,
        onPress: () => {
          Popup.custom({
            content: (
              <ScrollView style={{ backgroundColor: '#fff' }}>
                <ButtonsModeS />
              </ScrollView>
            ),
            title: buttonsmodetitle2,
            cancelText,
            confirmText,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              close();
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
