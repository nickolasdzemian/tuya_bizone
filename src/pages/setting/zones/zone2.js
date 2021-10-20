/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
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
    this.cache.get('name2').then(response => {
      this.setState({ name: response });
    });
    name = this.state.name;
    return name;
  }

  getHide() {
    let hide = null;
    this.cache.get('hide2').then(response => {
      this.setState({ hide: response });
    });
    hide = this.state.hide;
    return hide;
  }

  setHide(hide) {
    this.setState({ hide });
    this.cache.set('hide2', hide);
    EventRegister.emit('hide2', hide);
  }

  renameZone() {
    this.getName();
    Dialog.prompt({
      showHelp: true,
      onHelpPress: () => alert(Strings.getLang('namehelp')),
      title: Strings.getLang('name2'),
      cancelText: Strings.getLang('cancelText'),
      confirmText: Strings.getLang('confirmText'),
      confirmTextStyle: { color: '#ff7300' },
      inputStyle: { color: 'black' },
      defaultValue: this.state.name !== undefined ? this.state.name : null,
      placeholder: Strings.getLang('placeholder1'),
      maxLength: 20,
      autoCorrect: false,
      selectionColor: '#999',
      onConfirm: (text, { close }) => {
        this.setState({ name: text });
        this.cache.set('name2', text);
        EventRegister.emit('name2', text);
        close();
      },
    });
  }

  reset() {
    this.cache.remove('name2');
    this.setState({ name: null });
    EventRegister.emit('name2', undefined);
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
    const { Preheat2, SensorSet2 } = this.props;
    const value = this.state.wind;
    const hide = this.state.hide;
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faEyeSlash} color="#333" size={20} />
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
            <FontAwesomeIcon icon={faDoorOpen} color="#333" size={20} />
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
            <FontAwesomeIcon icon={faBrain} color="#333" size={20} />
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

        <TouchableOpacity
          style={styles.view}
          onPress={() => this.renameZone()}
          onLongPress={() => this.reset()}
        >
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faItalic} color="#333" size={20} />
            <TYText style={styles.items}>{Strings.getLang('rename')}</TYText>
          </SafeAreaView>
          <FontAwesomeIcon icon={faChevronRight} color="#ff7300" size={15} marginRight={23} />
        </TouchableOpacity>

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
    marginTop: 8,
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
  Preheat2: dpState[Preheat2Code],
  OpenWndW: dpState[OpenWndWCode],
  SensorSet2: dpState[SensorSet2Code],
}))(ZoneIIScene);
