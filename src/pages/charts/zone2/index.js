// страница входа в графики температур
import React from 'react';
import { View, StyleSheet } from 'react-native';
import EnteringToHell from './main';

const ChartZone2Scene = () => (
  <View style={styles.container}>
    <EnteringToHell />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChartZone2Scene;
