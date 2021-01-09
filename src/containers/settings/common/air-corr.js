import React, { Component } from 'react';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const aircorr = Strings.getLang('aircorr');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

export default class AirCorrScene extends Component {
  state = {
    numberValue: 0,
  };
  get data() {
    return [
      {
        key: 'numberSelector.slider',
        title: aircorr,
        onPress: () => {
          Popup.numberSelector({
            title: aircorr,
            cancelText,
            confirmText,
            type: 'slider',
            value: this.state.numberValue,
            maximumTrackTintColor: 'rgba(47, 47, 47, 0.5)',
            minimumTrackTintColor: '#FF7300',
            min: -9,
            max: 9,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              this.setState({ numberValue: value });
              if (value < 10) {
                close();
              } else {
                return false;
              }
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
