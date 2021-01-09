// страница входа в графики температур
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChartPanel from './common';

const ChartZone2Scene = () => (
  <View style={styles.container}>
    <ChartPanel />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChartZone2Scene;
