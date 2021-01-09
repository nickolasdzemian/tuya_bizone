import React from 'react';
import { View, StyleSheet } from 'react-native';
import WithContentTabsSSettings from './setting';

const SettingScene = () => (
  <View style={styles.container}>
    <WithContentTabsSSettings />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScene;
