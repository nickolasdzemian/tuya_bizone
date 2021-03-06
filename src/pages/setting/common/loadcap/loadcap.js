// отрисовка окна для выбора мощности нагрузки
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TYFlatList, Popup, Divider } from 'tuya-panel-kit';
import Strings from '../../../../i18n';
import LoadCapacity1 from './loadcap1';
import LoadCapacity2 from './loadcap2';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

export default class LoadCapacity extends Component {
  get data() {
    return [
      {
        key: 'custom',
        title: Strings.getLang('loadcapacity'),
        onPress: () => {
          Popup.custom({
            content: (
              <ScrollView style={styles.main}>
                <LoadCapacity1 />
                <Divider height={3} />
                <LoadCapacity2 />
              </ScrollView>
            ),
            title: Strings.getLang('loadcapacity1'),
            cancelText,
            confirmText,
            // motionType: 'none',
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

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
  },
});
