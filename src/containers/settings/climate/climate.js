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

const TYDevice = TYSdk.device;

const { ClimateSelector: ClimateSelectorCode } = dpCodes;

const climateSw = Strings.getLang('climateSw');

// один переключатель для режима климата
class ClimateScene extends React.PureComponent {
  static propTypes = {
    ClimateSelector: PropTypes.bool,
  };

  static defaultProps = {
    ClimateSelector: false,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  // updateIndex() {
  //   this.setState({});
  // }

  getData() {
    const { ClimateSelector } = this.props;
    console.log('ClimateSelector', ClimateSelector);
    return ClimateSelector;
  }

  render() {
    const { ClimateSelector } = this.props;
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
            value={this.getData()}
            onValueChange={() => {
              // this.setState({ value });
              TYDevice.putDeviceData({
                [ClimateSelectorCode]: !ClimateSelector,
              });
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

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ClimateScene);
