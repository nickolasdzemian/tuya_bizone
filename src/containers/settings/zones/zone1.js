/* eslint-disable global-require */
// Зона 1 - переключатели самообучения и окна
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen, faBrain, faListOl } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import Zone1Mode from './zone1mode';

const windowSw = Strings.getLang('windowSw');
const selflearnSw = Strings.getLang('selflearnSw');

export default class ZoneIScene extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex() {
    this.setState({});
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#ffb700" size={20} />
            <Text style={styles.items}>{windowSw}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            // width={100}
            // height={20}
            onTintColor="#ffb700"
            value={this.state.value1}
            onValueChange={value1 => {
              this.setState({ value1 });
            }}
          />
        </View>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faBrain} color="#ffb700" size={20} />
            <Text style={styles.items}>{selflearnSw}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            // width={100}
            // height={20}
            onTintColor="#ffb700"
            value={this.state.value2}
            onValueChange={value2 => {
              this.setState({ value2 });
            }}
          />
        </View>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faListOl} color="#ffb700" size={20} />
          <Zone1Mode />
        </SafeAreaView>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    // alignContent: 'space-between',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    alignItems: 'center',
    color: 'black',
    fontWeight: 'normal',
    fontSize: 15,
    padding: 14,
  },
  switch: {
    paddingRight: 14,
  },
});
