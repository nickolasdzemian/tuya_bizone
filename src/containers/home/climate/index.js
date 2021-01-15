import React from 'react';
import { View, StyleSheet } from 'react-native';
import ClimateMain from './climate';
import ClimateController from './controller';

const Climate = () => (
  <View style={styles.container}>
    <ClimateMain styles={{ flex: 4 }} />
    <ClimateController styles={{ flex: 1 }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
});

export default Climate;
