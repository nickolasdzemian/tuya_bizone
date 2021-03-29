import React from 'react';
import { View, StyleSheet } from 'react-native';
import CounterChartsList from './counter-list-char-view';

const CounterChartsScene = () => (
  <View style={styles.container}>
    <CounterChartsList />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default CounterChartsScene;
