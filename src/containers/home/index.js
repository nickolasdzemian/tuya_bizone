import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Divider } from 'tuya-panel-kit';
// import ButtonEX from './buttonEX';
import MainReport from './MainReport';
import Climate from './climate/index';
import Zones from './zones/index';

export default class ClimateMain extends React.PureComponent {
  constructor(props) {
    super(props);
    // if (this.datapoint.state) - условие
    this.stateClimate = { isHidden: false };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MainReport />
          <Divider />
          {this.stateClimate.isHidden ? <Climate /> : <Zones />}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
});
