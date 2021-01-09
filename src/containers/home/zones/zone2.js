// отображение всех элементов типа (report only)
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Slider, Stepper, Popup, TYSdk } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHandPointUp,
  faChartBar,
  faTasks,
  faCog,
  faPowerOff,
  faStopwatch20,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const mode = Strings.getLang('mode');
const ttimer = Strings.getLang('ttimer');
const programmmode = Strings.getLang('programmmode');
const programmtimermode = Strings.getLang('programmtimermode');
const manualmode = Strings.getLang('manualmode');
const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');

// определение массива данных с переводом
const set = new Set([manualmode, programmmode, programmtimermode]);
Array.from(set);

// разбор массива и вывод списка и селектора
const tabModes = Array.from(set).map(v => {
  return { key: `${v}`, title: `${v}`, value: `${v}` };
});

export default class Zone2 extends React.PureComponent {
  // в состояние данного конструктора вписываются значения datapoints,
  // от которых будет зависеть отображается тот или иной компонент
  // работает без DOM, отрисовка максимально быстрый
  constructor(props) {
    super(props);
    // if (this.datapoint.state) - условие
    this.stateCM = { isHidden: true };
    this.stateC = { isHidden: true };
    this.statePower = { isHidden: false };
    this.stateTimerOn = { isHidden: false };
    this.state = { listValue: manualmode };

    this.state = { countdown: 60, countdownSwitchValue: true };

    this.state = { valueZ1: 0 };
  }

  // функции навиготора
  goToSettingsPage = () => {
    TYSdk.Navigator.push({
      id: 'SettingScene',
      title: Strings.getLang('settings'),
    });
  };

  goToZoneChart = () => {
    TYSdk.Navigator.push({
      id: 'ChartZone2Scene',
      title: Strings.getLang('charts'),
    });
  };

  // йункция слайдера
  _handleCompleteZ1 = valueZ1 => {
    this.setState({ valueZ1: Math.round(valueZ1) });
  };

  // йункция таймера
  timer1 = () => {
    Popup.countdown(
      {
        title: ttimer,
        cancelText,
        confirmText,
        hourText: hrss,
        minuteText: minss,
        max: 1466,
        value: this.state.countdown,
        switchValue: this.state.countdownSwitchValue,
        onSwitchValueChange: value => this.setState({ countdownSwitchValue: value }),
        onMaskPress: ({ close }) => {
          close();
        },
        onConfirm: (data, { close }) => {
          this.setState({ countdown: data.value });
          if (data.value < 100) {
            console.log('return', data.value);
            return;
          }
          close();
        },
      },
      {
        onShow: () => console.log('show'),
        onHide: () => console.log('hide'),
        onDismiss: () => console.log('dismiss'),
      }
    );
  };

  // уйнкция выбора режима
  onPressMode = () => {
    Popup.list({
      type: 'radio',
      maxItemNum: 3,
      dataSource: tabModes, // сорцы для данных - можно вставить state из массива прям сюда
      iconTintColor: '#ff7300',
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView
      horizontal={true}
      indicatorStyle="white"
      pinchGestureEnabled={true}
      scrollBarThumbImage="#fff"
    > */}
        {this.stateCM.isHidden ? (
          <View style={styles.area}>
            <View style={styles.sel}>
              <FontAwesomeIcon icon={faHandPointUp} color="#ff7300" size={16} marginRight={5} />
              <Text style={styles.titlekwh}>{Strings.getLang('manualtemp')}:</Text>
              <Text style={styles.num}> {this.state.valueZ1}°C</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.context}>-15</Text>
              <Slider.Horizontal
                style={styles.slider}
                canTouchTrack={true}
                maximumValue={80}
                minimumValue={-15}
                value={this.state.valueZ1}
                maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
                minimumTrackTintColor="#ff7300"
                onValueChange={valueZ1 => this.setState({ valueZ1: Math.round(valueZ1) })}
                onSlidingComplete={this._handleCompleteZ1}
              />
              <Text style={styles.context}>+80</Text>
            </View>
            <Stepper
              buttonType="ellipse"
              buttonStyle={{ size: 'small' }}
              ellipseIconColor="#ff7300"
              style={styles.stepper}
              inputStyle={{ color: 'transparent' }}
              editable={false}
              onValueChange={valueZ1 => this.setState({ valueZ1: Math.round(valueZ1) })}
              max={80}
              stepValue={1}
              min={-15}
              value={this.state.valueZ1}
            />
          </View>
        ) : null}
        <View style={styles.areaContols}>
          <TouchableOpacity onPress={this.goToSettingsPage} style={styles.touch}>
            {this.statePower.isHidden ? (
              <FontAwesomeIcon icon={faPowerOff} color="#ff7300" size={30} margin={5} />
            ) : (
              <FontAwesomeIcon icon={faPowerOff} color="#d6d6d6" size={30} margin={5} />
            )}
            <Text style={styles.title}>{Strings.getLang('pwr')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.timer1} style={styles.touch}>
            {this.stateTimerOn.isHidden ? (
              <FontAwesomeIcon icon={faStopwatch20} color="#ff7300" size={30} margin={5} />
            ) : (
              <FontAwesomeIcon icon={faStopwatch20} color="#d6d6d6" size={30} margin={5} />
            )}
            <Text style={styles.title}>{Strings.getLang('ttimer')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToZoneChart} style={styles.touch}>
            <FontAwesomeIcon icon={faChartBar} color="#ff7300" size={30} margin={5} />
            <Text style={styles.title}>{Strings.getLang('prog')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressMode} style={styles.touch}>
            <FontAwesomeIcon icon={faTasks} color="#ff7300" size={30} margin={5} />
            <Text style={styles.title}>{Strings.getLang('mode')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToSettingsPage} style={styles.touch}>
            <FontAwesomeIcon icon={faCog} color="#ff7300" size={30} margin={5} />
            <Text style={styles.title}>{Strings.getLang('settings')}</Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  area: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '90%',
    height: 130,
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
    height: 70,
  },
  num: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  touch: {
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  sel: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  titlekwh: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 3,
  },
  context: {
    fontSize: 10,
    fontWeight: '200',
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  stepper: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
});
