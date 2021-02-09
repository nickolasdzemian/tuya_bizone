import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';
import ButtonMode12 from './buttons-mode12';

const buttonsmodetitle1 = Strings.getLang('buttonsmodetitle1');
const buttonsmodetitle2 = Strings.getLang('buttonsmodetitle2');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

export default class ButtonMode extends Component {
  get data() {
    return [
      {
        key: 'custom',
        title: buttonsmodetitle1,
        onPress: () => {
          Popup.custom({
            content: (
              <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                  <FontAwesomeIcon icon={faTh} color="#ffb700" size={25} alignSelf="center" />
                  <FontAwesomeIcon icon={faTh} color="#FF7300" size={25} alignSelf="center" />
                </View>
                <ButtonMode12 />
              </ScrollView>
            ),
            title: buttonsmodetitle2,
            cancelText,
            confirmText,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: () => {
              Popup.close();
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
