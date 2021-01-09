/* eslint-disable global-require */
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen, faBrain, faListOl } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import Zone2Mode from './zone2mode';

const windowSw = Strings.getLang('windowSw');
const selflearnSw = Strings.getLang('selflearnSw');

export default class ZoneIIScene extends React.PureComponent {
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
            <FontAwesomeIcon icon={faDoorOpen} color="#ff7300" size={20} />
            <Text style={styles.items}>{windowSw}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            // width={100}
            // height={20}
            onTintColor="#ff7300"
            value={this.state.value1}
            onValueChange={value1 => {
              this.setState({ value1 });
            }}
          />
        </View>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faBrain} color="#ff7300" size={20} />
            <Text style={styles.items}>{selflearnSw}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            // width={100}
            // height={20}
            onTintColor="#ff7300"
            value={this.state.value2}
            onValueChange={value2 => {
              this.setState({ value2 });
            }}
          />
        </View>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faListOl} color="#ff7300" size={20} />
          <Zone2Mode />
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
