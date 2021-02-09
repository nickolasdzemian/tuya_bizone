import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';
import { Utils, ControllerBar, TYSdk } from 'tuya-panel-kit';
import dpCodes from '../../config/dpCodes';
import Strings from '../../i18n';
import Res from '../../res';

const settings = Strings.getLang('settings');

const { width, convertX: cx } = Utils.RatioUtils;

const TYDevice = TYSdk.device;

const {
  craneGroup1: craneGroup1Code,
  craneGroup2: craneGroup2Code,
  groupEnable: groupEnableCode,
} = dpCodes;

class ButtonEX extends Component {
  static propTypes = {
    dpState: PropTypes.object,
    craneGroup1: PropTypes.bool,
    craneGroup2: PropTypes.bool,
    groupEnable: PropTypes.bool,
    dps: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  static defaultProps = {
    dpState: {},
    craneGroup1: false,
    craneGroup2: false,
    groupEnable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      dps: props.dps,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dps: nextProps.dps,
    });
  }

  // eslint-disable-next-line react/sort-comp
  getData() {
    const { craneGroup1, craneGroup2, groupEnable } = this.props;
    const { dps } = this.state;
    const commonProps = {
      textStyle: { fontSize: 12 },
      size: cx(32),
    };
    return [
      {
        key: craneGroup1Code,
        text: Strings.getDpLang(craneGroup1Code, craneGroup1),
        image: craneGroup1 ? Res.lockActive : Res.locked,
        imageColor: '#333',
        onPress: this.onChangeCraneGroup1,
      },
      {
        key: craneGroup2Code,
        text: Strings.getDpLang(craneGroup2Code, craneGroup2),
        image: craneGroup2 ? Res.lockActive : Res.locked,
        imageColor: '#333',
        onPress: this.onChangeCraneGroup2,
      },
      {
        key: groupEnableCode,
        text: Strings.getDpLang(groupEnableCode, groupEnable),
        image: groupEnable ? Res.lockActive : Res.locked,
        imageColor: '#333',
        onPress: this.onChangeGroupEnable,
      },
    ].map(data => ({
      ...commonProps,
      ...data,
    }));
  }

  onChangeCraneGroup1 = () => {
    const { craneGroup1 } = this.props;
    console.log('HomeCraneView', craneGroup1Code, craneGroup1);
    TYDevice.putDeviceData({
      [craneGroup1Code]: !craneGroup1,
    });
  };

  onChangeCraneGroup2 = () => {
    const { craneGroup2 } = this.props;
    console.log('HomeCraneView:', craneGroup2Code, craneGroup2);
    TYDevice.putDeviceData({
      [craneGroup2Code]: !craneGroup2,
    });
  };

  onChangeGroupEnable = () => {
    const { groupEnable } = this.props;
    console.log('HomeCraneView', groupEnableCode, groupEnable);
    TYDevice.putDeviceData({
      [groupEnableCode]: !groupEnable,
    });
  };

  goToSettingsPage = () => {
    TYSdk.Navigator.push({
      id: 'SettingScene',
      title: Strings.getLang('settings'),
    });
  };

  render() {
    // const { saveTime } = this.props;
    const data = this.getData();
    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        {/* <ControllerBar style={styles.controllerBar} button={data} backgroundColor="transparent" /> */}
        <Button title={settings} onPress={() => this.goToSettingsPage('Go to main Settings')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  button: {

  },
  controllerBar: {
    // height: 72,
    width,
    backgroundColor: 'transparent',
  },
});

export default connect(({ dpState }) => ({
  dpState,
  craneGroup1: dpState[craneGroup1Code],
  craneGroup2: dpState[craneGroup2Code],
  groupEnable: dpState[groupEnableCode],
}))(ButtonEX);
