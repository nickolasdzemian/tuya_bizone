import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Divider, TYSdk } from 'tuya-panel-kit';
import dpCodes from '../../config/dpCodes';
// import ButtonEX from './buttonEX';
import MainReport from './MainReport';
import Climate from './climate/index';
import Zones from './zones/index';

const TYDevice = TYSdk.device;
const { ClimateSelector: ClimateSelectorCode } = dpCodes;

export default class ClimateMain extends React.PureComponent {
  static propTypes = {
    ClimateSelector: PropTypes.bool,
  };
  static defaultProps = {
    ClimateSelector: false,
  };

  getDataClimate() {
    const { ClimateSelector } = this.props;
    console.log('Climate', ClimateSelector);
    return ClimateSelector;
  }

  // constructor(props) {
  //   super(props);
  //   // if (this.datapoint.state) - условие
  //   if (getDataClimate) this.stateClimate = { isHidden: false };
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <MainReport />
          <Divider />
          {this.getDataClimate().false ? <Climate /> : <Zones />}
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
