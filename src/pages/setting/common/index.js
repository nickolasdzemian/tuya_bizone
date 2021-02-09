/* eslint-disable global-require */
import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { Divider } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSpinner,
  faWind,
  faStethoscope,
  faBolt,
  faThLarge,
  faAlignLeft,
} from '@fortawesome/free-solid-svg-icons';
import BrightnessScene from './brightness';
import ButtonMode from './buttons/buttons-mode';
import ButtonSet from './buttons/buttons-main';
import AirCorrScene from './air-corr';
import SensorsType from './sensors/sensorstype';
import LoadCapacity from './loadcap/loadcap';
import { version } from '../../../../package.json';

const SettingScene = () => (
  <View style={styles.container}>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faSpinner} color="#FF7300" size={20} />
      <BrightnessScene />
    </SafeAreaView>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faThLarge} color="#FF7300" size={20} />
      <ButtonMode />
    </SafeAreaView>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faAlignLeft} color="#FF7300" size={20} />
      <ButtonSet />
    </SafeAreaView>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faWind} color="#FF7300" size={20} />
      <AirCorrScene />
    </SafeAreaView>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faStethoscope} color="#FF7300" size={20} />
      <SensorsType />
    </SafeAreaView>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faBolt} color="#FF7300" size={20} />
      <LoadCapacity />
    </SafeAreaView>
    <Divider />
    {/* <SafeAreaView style={styles.tinyLogo}>
      <Image style={styles.tinyLogo} source={require('../../../res/ATL.png')} />
    </SafeAreaView> */}
    <Text style={styles.ver}>
      v {version} with Tuya cloud support {'\n'}
      by nickolashka {'\n'}
      for development purposes only{'\n'}
      n.pozdnyakov@sst.ru
    </Text>
  </View>
);

const styles = StyleSheet.create({
  ver: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '100',
    fontSize: 10,
    alignSelf: 'center',
    marginTop: 290,
    flexWrap: 'wrap',
    letterSpacing: 1,
  },
  container: {
    flex: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  // items: {
  //   color: 'black',
  //   fontWeight: 'normal',
  //   fontSize: 14,
  // },
  // tinyLogo: {
  //   alignItems: 'center',
  //   opacity: 50,
  // },
});

export default SettingScene;
