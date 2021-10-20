/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
// Зона 1 - переключатели самообучения и окна
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { View, StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity } from 'react-native';
import { SwitchButton, TYSdk, TYText, Dialog, GlobalToast } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faDoorOpen,
  faBrain,
  faChevronRight,
  faItalic,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { Cache } from 'react-native-cache';
import { EventRegister } from 'react-native-event-listeners';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';
import Zone1Mode from './zone1mode';
import Zone1Air from './zone1AC';
import SensorsTypeZ1 from '../common/sensors/sensors1';

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
      name: undefined,
      hide: false,
    };
    this.cache = new Cache({
      namespace: `ZNames_${TYSdk.devInfo.devId}`,
      policy: {
        maxEntries: 5000,
      },
      backend: AsyncStorage,
    });
    this.getName();
    this.getHide();
  }

  getName() {
    let name = null;
    this.cache.get('name1').then(response => {
      this.setState({ name: response });
    });
    name = this.state.name;
    return name;
  }

  getHide() {
    let hide = null;
    this.cache.get('hide1').then(response => {
      this.setState({ hide: response });
    });
    hide = this.state.hide;
    return hide;
  }

  setHide(hide) {
    this.setState({ hide });
    this.cache.set('hide1', hide);
    EventRegister.emit('hide1', hide);
  }

  renameZone() {
    this.getName();
    Dialog.prompt({
      showHelp: true,
      onHelpPress: () => alert(Strings.getLang('namehelp')),
      title: Strings.getLang('name1'),
      cancelText: Strings.getLang('cancelText'),
      confirmText: Strings.getLang('confirmText'),
      confirmTextStyle: { color: '#ffb700' },
      inputStyle: { color: 'black' },
      defaultValue: this.state.name !== undefined ? this.state.name : null,
      placeholder: Strings.getLang('placeholder1'),
      maxLength: 20,
      autoCorrect: false,
      selectionColor: '#999',
      onConfirm: (text, { close }) => {
        this.setState({ name: text });
        this.cache.set('name1', text);
        EventRegister.emit('name1', text);
        Dialog.close();
      },
    });
  }

  reset() {
    this.cache.remove('name1');
    this.setState({ name: null });
    EventRegister.emit('name1', undefined);
    GlobalToast.show({
      text: Strings.getLang('done'),
      showIcon: false,
      contentStyle: {},
      showPosition: 'bottom',
      onFinish: () => {
        GlobalToast.hide();
      },
    });
  }

  render() {
    const { Preheat1, SensorSet1 } = this.props;
    const value = this.state.wind;
    const hide = this.state.hide;
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faEyeSlash} color="#666" size={20} />
            <TYText style={styles.items}>{Strings.getLang('hide12')}</TYText>
          </SafeAreaView>
          <SwitchButton
            style={styles.switch}
            tintColor="green"
            onTintColor="red"
            value={hide}
            onValueChange={() => {
              this.setHide(!hide);
            }}
          />
        </View>
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#666" size={20} />
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
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faBrain} color="#666" size={20} />
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

        <TouchableOpacity
          style={styles.view}
          onPress={() => this.renameZone()}
          onLongPress={() => this.reset()}
        >
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faItalic} color="#666" size={20} />
            <TYText style={styles.items}>{Strings.getLang('rename')}</TYText>
          </SafeAreaView>
          <FontAwesomeIcon icon={faChevronRight} color="#ffb700" size={15} marginRight={23} />
        </TouchableOpacity>

        <Zone1Mode />
        {SensorSet1 === 'air_flour' ? <Zone1Air /> : null}
        <SensorsTypeZ1 />
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
    marginTop: 8,
    // justifyContent: 'center',
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
  Preheat1: dpState[Preheat1Code],
  OpenWndW: dpState[OpenWndWCode],
  SensorSet1: dpState[SensorSet1Code],
}))(ZoneIScene);
