import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import dpCodes from '../../config/dpCodes';
import ClimateReport from './ClimateReport';
import ZoneReport from './ZoneReport';
import ClimateM from './climate/climate';
import Zones from './zones/index';
import ClimateController from './climate/controller';

const { ClimateSelector: ClimateSelectorCode } = dpCodes;

class ClimateMain extends React.PureComponent {
  static propTypes = {
    ClimateSelector: PropTypes.bool,
  };

  static defaultProps = {
    ClimateSelector: false,
  };

  render() {
    const { ClimateSelector } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {ClimateSelector === true ? (
            <View>
              <ClimateReport />
              <ClimateM />
            </View>
          ) : (
            <View>
              <ZoneReport />
              <Zones />
            </View>
          )}
        </ScrollView>
        {ClimateSelector === true ? <ClimateController /> : null}
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

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ClimateMain);
