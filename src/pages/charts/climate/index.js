// страница входа в графики температур
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChartClimateT from './temp';

const ChartClimateScene = () => (
  <View style={styles.container}>
    <ChartClimateT />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChartClimateScene;
