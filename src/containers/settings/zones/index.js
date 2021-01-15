// главная страница для отображения зон
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { TYSdk } from 'tuya-panel-kit';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import ZoneIScene from './zone1';
import ZoneIIScene from './zone2';

const ZonesScene = () => (
  <View style={styles.container}>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={25} />
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={20} />
      <Text style={styles.title}>{Strings.getLang('zone1')}</Text>
    </SafeAreaView>
    <ZoneIScene />
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={20} />
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={25} />
      <Text style={styles.title}>{Strings.getLang('zone2')}</Text>
    </SafeAreaView>
    <ZoneIIScene />
    {/* <Text style={styles.warn}>{Strings.getLang('cliwarn')}</Text> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 25,
  },
  title: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
  // warn: {
  //   textAlign: 'center',
  //   fontWeight: '400',
  //   fontSize: 18,
  //   color: '#FF2D00',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   padding: 80,
  //   alignSelf: 'auto',
  // },
});

export default ZonesScene;
