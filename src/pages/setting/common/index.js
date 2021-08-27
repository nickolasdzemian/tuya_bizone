/* eslint-disable global-require */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import BrightnessScene from './brightness';
// import ButtonMode from './buttons/buttons-mode';
import ButtonsConfig from './buttons/buttons-config';
import AirCorrScene from './air-corr';
import SensorsType from './sensors/sensorstype';
import LoadCapacity from './loadcap/loadcap';

const SettingScene = () => (
  <View style={styles.container}>
    <BrightnessScene />
    {/* <ButtonMode /> */}
    <ButtonsConfig />
    <AirCorrScene />
    <SensorsType />
    <LoadCapacity />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScene;
