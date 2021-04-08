// главная страница для отображения зон
// import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
// import { TYSdk } from 'tuya-panel-kit';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import ZoneIScene from './zone1';
import ZoneIIScene from './zone2';

const ZonesScene = () => (
  <ScrollView style={styles.container}>
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={25} />
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={20} />
      <TYText style={styles.title}>{Strings.getLang('zone1')}</TYText>
    </SafeAreaView>
    <ZoneIScene />
    <SafeAreaView style={styles.area}>
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={20} />
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={25} />
      <TYText style={styles.title}>{Strings.getLang('zone2')}</TYText>
    </SafeAreaView>
    <ZoneIIScene />
    {/* <TYText style={styles.warn}>{Strings.getLang('cliwarn')}</TYText> */}
  </ScrollView>
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
    color: '#474747',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

export default ZonesScene;
