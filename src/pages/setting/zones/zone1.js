/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// Зона 1 - переключатели самообучения и окна
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Divider, SwitchButton, TYSdk, TYText } from 'tuya-panel-kit';
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
    this.state = {
      wind: this.props.OpenWndW.substring(0, 2) === '01',
      overheat: this.props.Preheat1,
    };
  }

  render() {
    const { Preheat1, SensorSet1 } = this.props;
    const value = this.state.wind;
    return (
      <View style={styles.container}>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#ffb700" size={20} />
            <TYText style={styles.items}>{windowSw}</TYText>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            onTintColor="#ffb700"
            value={value}
            onValueChange={() => {
              this.setState({ wind: !value });
              const I = this.props.OpenWndW.substring(2, 4);
              const Tfin =
                this.props.OpenWndW.substring(0, 2) === '00' ? String(`01${I}`) : String(`00${I}`);
              TYDevice.putDeviceData({
                [OpenWndWCode]: Tfin,
              });
            }}
          />
        </View>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faBrain} color="#ffb700" size={20} />
            <TYText style={styles.items}>{selflearnSw}</TYText>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            onTintColor="#ffb700"
            value={this.state.overheat}
            onValueChange={() => {
              this.setState({ overheat: !Preheat1 });
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
  OpenWndW: '0000',
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
    fontSize: 16,
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
