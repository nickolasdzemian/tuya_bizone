// информация о режиме по нажатию на кнопку инфо
import React, { Component } from 'react';
import { TYFlatList, Popup, Utils, TYText } from 'tuya-panel-kit';
import { FlatList, StyleSheet } from 'react-native';
import Strings from '../../../i18n/index.ts';

const climateinfo = Strings.getLang('climateinfo');
const climateinfot = Strings.getLang('climateinfot');

const { convertX: cx } = Utils.RatioUtils;

export default class ClimateInfo extends Component {

  get data() {
    return [
      {
        key: 'tips',
        title: climateinfot,
        // styles: { title: styles.textSubtitle },
        onPress: () => {
          Popup.tips({
            show: true,
            bgColor: '#ffb700',
            cornerPosition: 'topRight',
            contentStyle: { borderRadius: cx(8) },
            modalChildStyle: { position: 'relative', top: cx(-210) },
            children: <TYText text={climateinfo} style={{ fontSize: cx(14) }} />,
          });
        },
      },
    ];
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 1 }} data={this.data} />;
  }
}

// const styles = StyleSheet.create({
//   textSubtitle: {
//     fontSize: 15,
//   },
// });
