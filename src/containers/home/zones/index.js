import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import Zone1 from './zone1';
import Zone2 from './zone2';

const Zones = () => (
  <View style={styles.container}>
    <Text style={styles.title1}>{Strings.getLang('zone1')}</Text>
    <Zone1 />
    <Divider />
    <Text style={styles.title2}>{Strings.getLang('zone2')}</Text>
    <Zone2 />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  title1: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#ffb700',
    justifyContent: 'center',
    paddingTop: 2,
  },
  title2: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#ff7300',
    justifyContent: 'center',
    paddingTop: 2,
  },
});

export default Zones;
