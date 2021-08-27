/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Divider, SwitchButton, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDoorOpen, faBrain, faListOl, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';
import Zone2Mode from './zone2mode';
import Zone2Air from './zone2AC';
import SensorsTypeZ2 from '../common/sensors/sensors2';

const TYDevice = TYSdk.device;
const { Preheat2: Preheat2Code, OpenWndW: OpenWndWCode, SensorSet2: SensorSet2Code } = dpCodes;

const windowSw = Strings.getLang('windowSw');
const selflearnSw = Strings.getLang('selflearnSw');

class ZoneIIScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wind: this.props.OpenWndW.substring(2, 4) === '01',
      overheat: this.props.Preheat2,
    };
  }

  render() {
    const { Preheat2, SensorSet2 } = this.props;
    const value = this.state.wind;
    return (
      <View style={styles.container}>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#ff7300" size={20} />
            <TYText style={styles.items}>{windowSw}</TYText>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            onTintColor="#ff7300"
            value={value}
            onValueChange={() => {
              this.setState({ wind: !value });
              const I = this.props.OpenWndW.substring(0, 2);
              const Tfin =
                this.props.OpenWndW.substring(2, 4) === '00' ? String(`${I}01`) : String(`${I}00`);
              TYDevice.putDeviceData({
                [OpenWndWCode]: Tfin,
              });
            }}
          />
        </View>
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faBrain} color="#ff7300" size={20} />
            <TYText style={styles.items}>{selflearnSw}</TYText>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            onTintColor="#ff7300"
            value={this.state.overheat}
            onValueChange={() => {
              this.setState({ overheat: !Preheat2 });
              TYDevice.putDeviceData({
                [Preheat2Code]: !Preheat2,
              });
            }}
          />
        </View>
        <Zone2Mode />
        {SensorSet2 === 'air_flour' ? <Zone2Air /> : null}
        <SensorsTypeZ2 />
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
    marginTop: 8,
    marginBottom: 8,
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
  Preheat2: dpState[Preheat2Code],
  OpenWndW: dpState[OpenWndWCode],
  SensorSet2: dpState[SensorSet2Code],
}))(ZoneIIScene);
