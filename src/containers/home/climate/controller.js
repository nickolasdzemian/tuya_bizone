import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TYSdk, Popup } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartBar, faTasks, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
// const selected = Strings.getLang('selected');

const mode = Strings.getLang('mode');
const programmmode = Strings.getLang('programmmode');
const manualmode = Strings.getLang('manualmode');

// определение массива данных с переводом
const set = new Set([manualmode, programmmode]);
Array.from(set);

// разбор массива и вывод списка и селектора
const tabModes = Array.from(set).map(v => {
  return { key: `${v}`, title: `${v}`, value: `${v}` };
});

export default class ClimateController extends React.PureComponent {
  constructor(props) {
    super(props);
    this.statePower = { isHidden: false };
    this.state = { listValue: manualmode };
  }

  onPressMode = () => {
    Popup.list({
      type: 'radio',
      maxItemNum: 3,
      dataSource: tabModes, // сорцы для данных - можно вставить state из массива прям сюда
      iconTintColor: '#90EE90',
      title: [mode],
      cancelText,
      confirmText,
      showBack: false,
      onBack: ({ close }) => {
        console.log('Select climate --none');
        close();
      },
      value: this.state.listValue,
      footerType: 'singleCancel',
      onMaskPress: ({ close }) => {
        close();
      },
      // выбор и сохранение значения из списка по нажатию
      onSelect: (value, { close }) => {
        console.log('radio value :', value);
        this.setState({ listValue: value });
        // close();
      },
    });
  };

  // функции навиготора
  goToSettingsPage = () => {
    TYSdk.Navigator.push({
      id: 'SettingScene',
      title: Strings.getLang('settings'),
    });
  };

  goToClimateChart = () => {
    TYSdk.Navigator.push({
      id: 'ChartClimateScene',
      title: Strings.getLang('charts'),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.areaContols}>
          <TouchableOpacity onPress={this.goToSettingsPage} style={styles.touch}>
            {this.statePower.isHidden ? (
              <FontAwesomeIcon icon={faPowerOff} color="#ff7300" size={30} margin={10} />
            ) : (
              <FontAwesomeIcon icon={faPowerOff} color="#d6d6d6" size={30} margin={10} />
            )}
            <Text style={styles.title}>{Strings.getLang('pwr')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToClimateChart} style={styles.touch}>
            <FontAwesomeIcon icon={faChartBar} color="#ff7300" size={30} margin={10} />
            <Text style={styles.title}>{Strings.getLang('prog')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressMode} style={styles.touch}>
            <FontAwesomeIcon icon={faTasks} color="#ff7300" size={30} margin={10} />
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
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
