import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChartView from './chart';

const CounterChartsScene = () => (
  <View style={styles.container}>
    <ChartView />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default CounterChartsScene;
