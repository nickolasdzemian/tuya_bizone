import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Strings from '../../../i18n/index.ts';
import Zone1 from './zone1';
import Zone2 from './zone2';

const Zones = () => (
  <View style={styles.container}>
    <TYText style={styles.title1}>{Strings.getLang('zone1')}</TYText>
    <Zone1 />
    <TYText style={styles.title2}>{Strings.getLang('zone2')}</TYText>
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
    paddingTop: 8,
  },
  title2: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#ff7300',
    justifyContent: 'center',
    paddingTop: 6,
  },
});

export default Zones;
