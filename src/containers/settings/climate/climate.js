/* eslint-disable global-require */
// основной код климата
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSeedling, faInfoCircle, faListOl } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import ClimateMode from './climatemode';
import ClimateInfo from './climateinfo';

const climateSw = Strings.getLang('climateSw');

// один переключатель для режима климата
export default class ClimateScene extends React.PureComponent {
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
            <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} />
            <Text style={styles.items}>{climateSw}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            // width={100}
            // height={20}
            tintColor="#ffb700"
            onTintColor="#90EE90"
            value={this.state.value}
            onValueChange={value => {
              this.setState({ value });
            }}
          />
        </View>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faListOl} color="#90EE90" size={20} />
          <ClimateMode />
        </SafeAreaView>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faInfoCircle} color="#ffb700" size={20} />
          <ClimateInfo />
        </SafeAreaView>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
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
