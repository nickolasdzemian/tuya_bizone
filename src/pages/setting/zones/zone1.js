/* eslint-disable global-require */
// Зона 1 - переключатели самообучения и окна
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen, faBrain, faListOl, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';
import Zone1Mode from './zone1mode';
import Zone1Air from './zone1AC';

const TYDevice = TYSdk.device;
const { Preheat1: Preheat1Code, OpenWndW: OpenWndWCode, SensorSet1: SensorSet1Code } = dpCodes;

const windowSw = Strings.getLang('windowSw');
const selflearnSw = Strings.getLang('selflearnSw');

class ZoneIScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData() {
    const { Preheat1 } = this.props;
    return Preheat1;
  }

  getDataW() {
    const { OpenWndW } = this.props;
    const W = this.props.OpenWndW;
    console.log(W, 'W');
    const W1 = W.substring(0, 2);
    console.log(W1, 'W1');
    // W1 === '0100' === '0101' ? Boolean.valueOf(this.state, true) : Boolean.valueOf(this.state, false);
    return OpenWndW;
  }

  render() {
    const { Preheat1, SensorSet1 } = this.props;
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
            onTintColor="#ffb700"
            value={this.getData()}
            onValueChange={() => {
              TYDevice.putDeviceData({
                [Preheat1Code]: !Preheat1,
              });
            }}
          />
        </View>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faListOl} color="#ffb700" size={20} />
          <Zone1Mode />
        </SafeAreaView>
        {SensorSet1 === 'air_flour' ? (
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faSortAmountUp} color="#ffb700" size={20} />
            <Zone1Air />
          </SafeAreaView>
        ) : null}
        <Divider />
      </View>
    );
  }
}

ZoneIScene.propTypes = {
  Preheat1: PropTypes.bool,
  OpenWndW: PropTypes.string,
  SensorSet1: PropTypes.string,
};

ZoneIScene.defaultProps = {
  Preheat1: false,
  OpenWndW: '00',
  SensorSet1: 'air_flour',
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
  Preheat1: dpState[Preheat1Code],
  OpenWndW: dpState[OpenWndWCode],
  SensorSet1: dpState[SensorSet1Code],
}))(ZoneIScene);
