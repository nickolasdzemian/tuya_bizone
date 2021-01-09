// окно выбора типов датчиков
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n';
import PickSensorType1Scene from './sensortype12';

const sensorstype = Strings.getLang('sensorstype');
const sensortype0 = Strings.getLang('sensortype0');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

export default class SensorsType extends Component {
  get data() {
    return [
      {
        key: 'custom',
        title: sensorstype,
        onPress: () => {
          Popup.custom({
            content: (
              <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                  <FontAwesomeIcon
                    icon={faThermometerHalf}
                    color="#ffb700"
                    size={25}
                    alignSelf="center"
                  />
                  <FontAwesomeIcon
                    icon={faThermometerHalf}
                    color="#FF7300"
                    size={25}
                    alignSelf="center"
                  />
                </View>
                <PickSensorType1Scene />
              </ScrollView>
            ),
            title: sensortype0,
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
