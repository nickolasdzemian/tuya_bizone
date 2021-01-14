/* eslint-disable global-require */
// основной код климата
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSeedling, faInfoCircle, faListOl } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';
import ClimateMode from './climatemode';
import ClimateInfo from './climateinfo';
// import ClimateChScene from './climatech';

const TYDevice = TYSdk.device;

const { ClimateSelector: ClimateSelectorCode, chSelector: chSelectorCode } = dpCodes;

// включение режима климата и переключение режима каналов
class ClimateScene extends React.PureComponent {
  static propTypes = {
    ClimateSelector: PropTypes.bool,
    chSelector: PropTypes.bool,
  };

  static defaultProps = {
    ClimateSelector: false,
    chSelector: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getDataClimate() {
    const { ClimateSelector } = this.props;
    console.log('Climate', ClimateSelector);
    return ClimateSelector;
  }

  getDataSelector() {
    const { chSelector } = this.props;
    console.log('ClimateCH', chSelector);
    return chSelector;
  }

  render() {
    const { ClimateSelector, chSelector } = this.props;
    return (
      <View style={styles.container}>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} />
            <Text style={styles.items}>{Strings.getLang('climateSw')}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            tintColor="#ffb700"
            onTintColor="#90EE90"
            value={this.getDataClimate()}
            onValueChange={() => {
              TYDevice.putDeviceData({
                [ClimateSelectorCode]: !ClimateSelector,
              });
            }}
          />
        </View>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} />
            <Text style={styles.items}>{Strings.getLang('climateSw')}</Text>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            tintColor="#ffb700"
            onTintColor="#90EE90"
            value={this.getDataSelector()}
            onValueChange={() => {
              TYDevice.putDeviceData({
                [chSelectorCode]: !chSelector,
              });
            }}
          />
        </View>
        {/* <SafeAreaView style={styles.area}>
          <ClimateChScene />
        </SafeAreaView> */}
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

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  chSelector: dpState[chSelectorCode],
}))(ClimateScene);
