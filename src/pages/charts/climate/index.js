// страница входа в графики температур
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChartPanel from './common';

const ChartClimateScene = () => (
  <View style={styles.container}>
    <ChartPanel />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default ChartClimateScene;
