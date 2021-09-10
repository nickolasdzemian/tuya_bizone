// отрисовка окна для выбора мощности нагрузки
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Utils, Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { Cache } from 'react-native-cache';
import Strings from '../../../../i18n';
import dpCodes from '../../../../config/dpCodes';
import LoadCapacity0 from './loadcap1';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const TYDevice = TYSdk.device;
const { PowerRate1: PowerRate1Code, PowerRate2: PowerRate2Code } = dpCodes;

const { convertY: cy } = Utils.RatioUtils;

const cache = new Cache({
  namespace: 'Capacity',
  policy: {
    maxEntries: 50000,
  },
  backend: AsyncStorage,
});

class LoadCapacity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: false,
    };
  }

  async _handleComplete() {
    const value1 = await cache.get('value1');
    const value2 = await cache.get('value2');
    TYDevice.putDeviceData({
      [PowerRate1Code]: value1,
      [PowerRate2Code]: value2,
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          height: cy(30),
          borderTopEndRadius: 12,
          borderBottomEndRadius: 12, 
          marginRight: 8,
        }}
        activeOpacity={0.8}
        onPress={() =>
          Popup.custom({
            content: <LoadCapacity0 set={this.state.set} />,
            title: Strings.getLang('loadcapacity1'),
            cancelText,
            confirmText,
            // footerType: 'singleConfirm',
            // motionType: 'none',
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              this._handleComplete();
              this.setState({ set: true });
              close();
            },
          })}
      >
        <FontAwesomeIcon
          icon={faCogs}
          color="#999"
          size={16}
          marginLeft={8}
          marginRight={8}
          alignSelf="center"
        />
        <TYText style={styles.items}>{Strings.getLang('setLoad')}</TYText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    color: '#333',
    textAlignVertical: 'center',
  },
});

export default connect(({ dpState }) => ({
  PowerRate1: dpState[PowerRate1Code],
  PowerRate2: dpState[PowerRate2Code],
}))(LoadCapacity);
