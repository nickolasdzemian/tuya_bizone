import React, { Component } from 'react';
import { TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const brightnessText = Strings.getLang('brightness');
const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

export default class BrightnessScene extends Component {
  state = {
    numberValue: 0,
  };
  get data() {
    return [
      {
        key: 'numberSelector.slider',
        title: brightnessText,
        onPress: () => {
          Popup.numberSelector({
            title: brightnessText,
            cancelText,
            confirmText,
            type: 'slider',
            value: this.state.numberValue,
            maximumTrackTintColor: 'rgba(47, 47, 47, 0.5)',
            minimumTrackTintColor: '#FF7300',
            min: 0,
            max: 10,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              this.setState({ numberValue: value });
              if (value < 11) {
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
