// главная страница для отображения зон
import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ZoneIScene from './zone1';
import ZoneIIScene from './zone2';

const ZonesScene = () => (
  <ScrollView style={styles.container}>
    <SafeAreaView style={styles.area}>
      <TYText style={[styles.title, { color: '#ffb700' }]}>1</TYText>
      {/* <SafeAreaView style={[styles.area, { flexDirection: 'row' }]}>
        <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={25} />
        <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={20} marginRight={14} />
      </SafeAreaView> */}
    </SafeAreaView>
    <ZoneIScene />
    <SafeAreaView style={styles.area}>
      <TYText style={[styles.title, { color: '#ff7300' }]}>2</TYText>
      {/* <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={20} />
      <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={25} marginRight={22} /> */}
    </SafeAreaView>
    <ZoneIIScene />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    // margin: 16,
    // marginTop: 25,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 27,
    color: '#474747',
    flexDirection: 'row',
    marginLeft: 23,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
});

export default ZonesScene;
