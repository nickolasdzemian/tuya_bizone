/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen, faBrain, faListOl, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';
import Zone2Mode from './zone2mode';
import Zone2Air from './zone2AC';

const TYDevice = TYSdk.device;
const { Preheat2: Preheat2Code, OpenWndW: OpenWndWCode, SensorSet2: SensorSet2Code } = dpCodes;

const windowSw = Strings.getLang('windowSw');
const selflearnSw = Strings.getLang('selflearnSw');

class ZoneIIScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData() {
    const { Preheat2 } = this.props;
    console.log('Preheat2', Preheat2);
    return Preheat2;
  }

  render() {
    const { Preheat2, SensorSet2 } = this.props;
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
            value={this.props.OpenWndW.substring(2, 4) === '01'}
            onValueChange={() => {
              const I = this.props.OpenWndW.substring(0, 2);
              const ON = '01';
              const OFF = '00';
              const Tfin =
                this.props.OpenWndW.substring(2, 4) === '00' ? String(I + ON) : String(I + OFF);
              TYDevice.putDeviceData({
                [OpenWndWCode]: Tfin,
              });
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
            value={this.getData()}
            onValueChange={() => {
              // this.setState({ value });
              TYDevice.putDeviceData({
                [Preheat2Code]: !Preheat2,
              });
            }}
          />
        </View>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faListOl} color="#ff7300" size={20} />
          <Zone2Mode />
        </SafeAreaView>
        {SensorSet2 === 'air_flour' ? (
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faSortAmountUp} color="#ff7300" size={20} />
            <Zone2Air />
          </SafeAreaView>
        ) : null}
        <Divider />
      </View>
    );
  }
}

ZoneIIScene.propTypes = {
  Preheat2: PropTypes.bool,
  OpenWndW: PropTypes.string,
  SensorSet2: PropTypes.string,
};

ZoneIIScene.defaultProps = {
  Preheat2: false,
  OpenWndW: '0000',
  SensorSet2: 'air_flour',
};

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

export default connect(({ dpState }) => ({
  Preheat2: dpState[Preheat2Code],
  OpenWndW: dpState[OpenWndWCode],
  SensorSet2: dpState[SensorSet2Code],
}))(ZoneIIScene);
