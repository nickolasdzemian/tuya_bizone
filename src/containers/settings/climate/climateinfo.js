// информация о режиме по нажатию на кнопку инфо
import React, { Component } from 'react';
import { TYFlatList, Popup, Utils, TYText } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const climateinfo = Strings.getLang('climateinfo');
const climateinfot = Strings.getLang('climateinfot');

const { convertX: cx } = Utils.RatioUtils;

export default class ClimateInfo extends Component {
  state = {};

  get data() {
    return [
      {
        key: 'tips',
        title: climateinfot,
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
