/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TYSdk, Popup } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartBar, faTasks, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;
const { Zone: ZoneCode, ModeChannel: ModeChannelCode } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
const mode = Strings.getLang('mode');

class ClimateController extends PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { 
      listValue: this.modeI + this.modeCli,
      power: this.props.Zone.substring(4, 6),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.Zone !== nextProps.Zone) {
      this.setState({ power: nextProps.Zone.substring(4, 6) });
    }

    if (nextProps.Zone) {
      this.setState({ power: nextProps.Zone.substring(4, 6) });
    }
  }

  onPressMode = () => {
    const modeI = this.props.ModeChannel.substring(0, 4);
    const modeCli = this.props.ModeChannel.substring(4, 6);
    const modeCliProg = '01';
    const modeCliMan = '00';
    Popup.list({
      type: 'radio',
      maxItemNum: 2,
      dataSource: [
        {
          key: '00',
          title: Strings.getLang('manualmode'),
          value: String(modeI + modeCliMan),
        },
        {
          key: '01',
          title: Strings.getLang('programmmode'),
          value: String(modeI + modeCliProg),
        },
      ],
      iconTintColor: '#90EE90',
      title: [mode],
      cancelText,
      confirmText,
      showBack: false,
      onBack: ({ close }) => {
        console.log('Select climate --none');
        close();
      },
      value: String(modeI + modeCli),
      footerType: 'singleCancel',
      onMaskPress: ({ close }) => {
        close();
      },
      // выбор и сохранение значения из списка по нажатию
      onSelect: (value, { close }) => {
        TYDevice.putDeviceData({
          [ModeChannelCode]: value,
        });
        // eslint-disable-next-line react/no-unused-state
        this.setState({ listValue: value });
        this.forceUpdate();
        // close();
      },
    });
  };

  changePowerZone = () => {
    const I = this.props.Zone.substring(0, 4);
    const C = this.props.Zone.substring(4, 6);
    const C00 = String(`${I}00`);
    const C01 = String(`${I}01`);
    TYDevice.putDeviceData({
      [ZoneCode]: C === '01' ? C00 : C01,
    });
    this.setState({ power: C === '01' ? '00' : '01' });
  };

  // функции навиготора
  goToSettingsPageЩдв = () => {
    TYSdk.Navigator.push({
      id: 'SettingScene',
      title: Strings.getLang('settings'),
    });
  };

  goToSettingsPage = () => {
    const route = {
      id: 'SettingScene',
      title: Strings.getLang('settings'),
    };
    TYSdk.Navigator.push(route);
  };

  goToClimateChart = () => {
    TYSdk.Navigator.push({
      id: 'ChartClimateScene',
      title: Strings.getLang('charts'),
    });
  };

  render() {
    const C = this.state.power;
    const modeCli = this.props.ModeChannel.substring(4, 6);
    return (
      <View style={styles.container}>
        <View style={styles.areaContols}>
          <TouchableOpacity onPress={this.changePowerZone} style={styles.touch}>
            <FontAwesomeIcon
              icon={faPowerOff}
              color={C === '01' ? '#ff7300' : '#d6d6d6'}
              size={30}
              margin={10}
            />
            <Text style={styles.title}>{Strings.getLang('pwr')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={modeCli === '01' ? this.goToClimateChart : null}
            style={styles.touch}
          >
            <FontAwesomeIcon
              icon={faChartBar}
              color={C === '01' && modeCli === '01' ? '#ff7300' : '#d6d6d6'}
              size={30}
              margin={10}
            />
            <Text style={styles.title}>{Strings.getLang('prog')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressMode} style={styles.touch}>
            <FontAwesomeIcon
              icon={faTasks}
              color={C === '01' ? '#ff7300' : '#d6d6d6'}
              size={30}
              margin={10}
            />
            <Text style={styles.title}>{Strings.getLang('mode')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSettingsPage} style={styles.touch}>
            <FontAwesomeIcon icon={faCog} color="#ff7300" size={30} margin={10} />
            <Text style={styles.title}>{Strings.getLang('settings')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ClimateController.propTypes = {
  Zone: PropTypes.string,
  ModeChannel: PropTypes.string,
};

ClimateController.defaultProps = {
  Zone: '010101',
  ModeChannel: '000000',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  areaContols: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '90%',
    height: 90,
  },
  touch: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(({ dpState }) => ({
  Zone: dpState[ZoneCode],
  ModeChannel: dpState[ModeChannelCode],
}))(ClimateController);
