import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TYText, TYSdk } from 'tuya-panel-kit';
import dpCodes from '../../config/dpCodes.ts';
import ClimateReport from './ClimateReport';
import ClimateM from './climate/climate';
import Zones from './zones/index';
import ClimateController from './climate/controller';
import Strings from '../../i18n/index.ts';

const { ClimateSelector: ClimateSelectorCode } = dpCodes;

class ClimateMain extends React.PureComponent {
  render() {
    const { ClimateSelector } = this.props;
    return (
      <View style={styles.container}>
        {ClimateSelector === true ? (
          <View>
            <ClimateReport />
            <ClimateM />
          </View>
        ) : (
          <Zones />
        )}
        {ClimateSelector === true ? (
          <ClimateController />
        ) : (
          <TouchableOpacity
            onPress={() =>
              TYSdk.Navigator.push({
                id: 'SettingScene',
                title: Strings.getLang('settings'),
              })}
            style={styles.touch}
          >
            <TYText style={styles.text}>{Strings.getLang('settings')}</TYText>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

ClimateMain.propTypes = {
  ClimateSelector: PropTypes.bool,
};

ClimateMain.defaultProps = {
  ClimateSelector: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    fontSize: 20,
  },
  touch: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 50,
    margin: 8,
    marginBottom: 33,
    justifyContent: 'center',
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ClimateMain);
