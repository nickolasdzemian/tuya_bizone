/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TYSdk, TYText, Utils, Notification } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { version } from '../../../package.json';
import Strings from '../../i18n/index.ts';
import dpCodes from '../../config/dpCodes.ts';
import Common from './common/index';
import ClimateScene from './climate/climate';

const TYDevice = TYSdk.device;
const { isIos } = Utils.RatioUtils;
const { Christ: ChristCode } = dpCodes;
const Christ = this.props;

export default class WithContentTabsSSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  diablo() {
    TYDevice.putDeviceData({
      [ChristCode]: !Christ,
    });
    Notification.show({
      message: 'Режим Рождественского Чуда активирован',
      onClose: () => {
        Notification.hide();
      },
      theme: {
        successIcon: 'red',
        errorIcon: 'yellow',
        warningIcon: 'black',
      },
    }); 
    // TYSdk.mobile.enablePopGesture();
  } 

  render() {
    return (
      <View style={styles.cont}>
        <ScrollView>
          <ClimateScene />
          <Common />
        </ScrollView>
        <TouchableOpacity 
          style={styles.ver} 
          onPress={() => TYSdk.mobile.jumpTo('https://sstcloud.ru/tuya/bizone')}
          alignSelf="center"
          onLongPress={() => this.diablo()}
        >
          <FontAwesomeIcon icon={faInfoCircle} color="#333" size={30} marginBottom={5} />
          <TYText style={{ color: '#333' }}>{Strings.getLang('faq')}</TYText>
          <TYText style={{ color: '#333' }}>{`v ${version}`}</TYText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ver: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0',
    width: 100,
    marginBottom: isIos === true ? 33 : 12,
  },

});
