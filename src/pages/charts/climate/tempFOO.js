/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  TYSdk,
  TYFlatList,
  Popup,
  Tabs,
  Divider,
  Stepper,
  TimerPicker,
  Picker,
} from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faThermometerHalf,
  faBusinessTime,
  faTrashAlt,
  faCog,
  faPowerOff,
  faStopwatch20,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');
const pointset = Strings.getLang('pointset');

const {
  chart_1_part_1: chart_1_part_1Code,
  chart_1_part_2: chart_1_part_2Code,
  chart_1_part_3: chart_1_part_3Code,
  chart_1_part_4: chart_1_part_4Code,
} = dpCodes;

const Res = {
  hue: require('../../../res/hue.png'),
};

class ClimateProgramm extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      temp: this._getTemp(),
      time: this._getTime(),
      activeKey: [7, 1, 2, 3, 4, 5, 6][date.getDay()],
      d1: [
        { value: 1, label: Strings.getLang('mon') },
        { value: 2, label: Strings.getLang('tuу') },
        { value: 3, label: Strings.getLang('wed') },
        { value: 4, label: Strings.getLang('thu') },
        { value: 5, label: Strings.getLang('fri') },
        { value: 6, label: Strings.getLang('sat') },
        { value: 7, label: Strings.getLang('sun') },
      ],
      dutemps: _.range(-15, 80),
      stepperValue: 0,
      timeSelectionValue: 0,
    };
  }

  getdata() {
    const { time, temp } = this.state;
    const Data = [];
    if (this._getLenth() > 0) {
      for (let i = 0; i < this._getLenth(); i++) {
        Data[i] = {
          id: i,
          temperature: temp[i],
          time: time[i],
          day:
            time[i] < 1440
              ? 'mon'
              : time[i] > 1439 && time[i] < 2880
                ? 'tuy'
                : time[i] > 2879 && time[i] < 4320
                  ? 'wed'
                  : time[i] > 4319 && time[i] < 5760
                    ? 'thu'
                    : time[i] > 5759 && time[i] < 7200
                      ? 'fri'
                      : time[i] > 7199 && time[i] < 8640
                        ? 'sat'
                        : time[i] > 8639 && time[i] < 10081
                          ? 'sun'
                          : false,
        };
      }
    }
    console.log('chart for list', Data);
    return Data;
  }

  convertMinsToTime = mins => {
    // const hours = (Math.floor(mins / 60) - ((this.state.activeKey - 1) * 24));
    let hours =
      mins < 1440
        ? Math.floor(mins / 60)
        : mins > 1439 && mins < 2880
          ? Math.floor((mins - 1440) / 60)
          : mins > 2879 && mins < 4320
            ? Math.floor((mins - 2880) / 60)
            : mins > 4319 && mins < 5760
              ? Math.floor((mins - 4320) / 60)
              : mins > 5759 && mins < 7200
                ? Math.floor((mins - 5760) / 60)
                : mins > 7199 && mins < 8640
                  ? Math.floor((mins - 7200) / 60)
                  : mins > 8639 && mins < 10081
                    ? Math.floor((mins - 8640) / 60)
                    : null;
    hours = hours < 10 ? `0${hours}` : hours;
    let minutes = mins % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}${hrss}:${minutes}${minss}`;
  };

  convertMinsToMins = mins => {
    const MMM =
      mins < 1440
        ? Math.floor(mins)
        : mins > 1439 && mins < 2880
          ? Math.floor(mins - 1440)
          : mins > 2879 && mins < 4320
            ? Math.floor(mins - 2880)
            : mins > 4319 && mins < 5760
              ? Math.floor(mins - 4320)
              : mins > 5759 && mins < 7200
                ? Math.floor(mins - 5760)
                : mins > 7199 && mins < 8640
                  ? Math.floor(mins - 7200)
                  : mins > 8639 && mins < 10081
                    ? Math.floor(mins - 8640)
                    : null;
    return MMM;
  };

  _getLenth() {
    const Ipart = parseInt(this.props.chart_1_part_1.substring(0, 4), 16);
    const IIpart = parseInt(this.props.chart_1_part_2.substring(0, 4), 16);
    const IIIpart = parseInt(this.props.chart_1_part_3.substring(0, 4), 16);
    const IVpart = parseInt(this.props.chart_1_part_4.substring(0, 4), 16);
    const LENA = Ipart + IIpart + IIIpart + IVpart;
    console.log(LENA);
    return LENA;
  }

  _getTemp() {
    const part1 =
      parseInt(this.props.chart_1_part_1.substring(0, 4), 16) > 0
        ? this.props.chart_1_part_1.substring(4)
        : '';
    const part2 =
      parseInt(this.props.chart_1_part_2.substring(0, 4), 16) > 0
        ? this.props.chart_1_part_2.substring(4)
        : '';
    const part3 =
      parseInt(this.props.chart_1_part_3.substring(0, 4), 16) > 0
        ? this.props.chart_1_part_3.substring(4)
        : '';
    const part4 = parseInt(this.props.chart_1_part_4.substring(0, 4), 16)
      ? this.props.chart_1_part_4.substring(4)
      : '';
    const part0 = (part1 + part2 + part3 + part4).match(/(......?)/g);
    const temps = part0.map(item =>
      parseInt(item.substring(4, 6), 16) > 100
        ? parseInt(item.substring(4, 6), 16) - 256
        : parseInt(item.substring(4, 6), 16)
    );
    return temps;
  }

  _getTime() {
    const part1 =
      parseInt(this.props.chart_1_part_1.substring(0, 4), 16) > 0
        ? this.props.chart_1_part_1.substring(4)
        : '';
    const part2 =
      parseInt(this.props.chart_1_part_2.substring(0, 4), 16) > 0
        ? this.props.chart_1_part_2.substring(4)
        : '';
    const part3 =
      parseInt(this.props.chart_1_part_3.substring(0, 4), 16) > 0
        ? this.props.chart_1_part_3.substring(4)
        : '';
    const part4 = parseInt(this.props.chart_1_part_4.substring(0, 4), 16)
      ? this.props.chart_1_part_4.substring(4)
      : '';
    const part0 = (part1 + part2 + part3 + part4).match(/(......?)/g);
    const times = part0.map(item => parseInt(item.substring(0, 4), 16));
    return times;
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  _handleD1Change = tab => {
    this.setState({ activeKey: tab.value });
  };

  render() {
    const DATA = this.getdata();
    const monDATA = this.getdata().filter(item => item.day === 'mon');
    const tuyDATA = this.getdata().filter(item => item.day === 'tuy');
    const wedDATA = this.getdata().filter(item => item.day === 'wed');
    const thuDATA = this.getdata().filter(item => item.day === 'thu');
    const friDATA = this.getdata().filter(item => item.day === 'fri');
    const satDATA = this.getdata().filter(item => item.day === 'sat');
    const sunDATA = this.getdata().filter(item => item.day === 'sun');
    const Item = ({ id, title, subTitle, day }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        underlayColor="#90EE90"
        onLongPress={() => {
          this.setState({
            stepperValue: title,
            timeSelectionValue: this.convertMinsToMins(subTitle),
          });
          let temp = title;
          let time = this.convertMinsToMins(subTitle);
          Popup.custom({
            content: (
              <View
                style={{
                  flexDirection: 'row',
                  height: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  padding: 8,
                }}
              >
                <FontAwesomeIcon
                  icon={faThermometerHalf}
                  color="#474747"
                  size={25}
                  marginRight={20}
                  marginLeft={10}
                />
                <Picker
                  style={styles.tempPicker}
                  // loop={true}
                  itemStyle={styles.tempPicker}
                  selectedValue={title}
                  onValueChange={stepperValue =>
                    this.setState({
                      stepperValue: parseInt(stepperValue, 10),
                    })
                  }
                >
                  {this.state.dutemps.map(stepperValue => (
                    <Picker.Item
                      style={styles.tempPicker}
                      key={stepperValue}
                      value={stepperValue}
                      label={String(`${stepperValue} °C`)}
                    />
                  ))}
                </Picker>
                <Divider
                  style={{
                    flexDirection: 'column',
                    color: 'black',
                    alignSelf: 'center',
                    height: 100,
                    marginLeft: 20,
                    margin: 20,
                  }}
                />
                <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={25} />
                <TimerPicker
                  style={styles.timerPicker}
                  startTime={time}
                  is12Hours={false}
                  singlePicker={true}
                  onTimerChange={timeSelectionValue => this.setState({ timeSelectionValue })}
                />
              </View>
            ),
            title: pointset,
            cancelText,
            confirmText,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (idx, { close }) => {
              temp = this.state.stepperValue;
              time =
                day === 'mon'
                  ? this.state.timeSelectionValue
                  : day === 'tuy'
                    ? this.state.timeSelectionValue + 1440
                    : day === 'wed'
                      ? this.state.timeSelectionValue + 2880
                      : day === 'thu'
                        ? this.state.timeSelectionValue + 4320
                        : day === 'fri'
                          ? this.state.timeSelectionValue + 5760
                          : day === 'sat'
                            ? this.state.timeSelectionValue + 7200
                            : day === 'sun'
                              ? this.state.timeSelectionValue + 8640
                              : alert(Strings.getLang('UERROR'));
              DATA.splice(id, 1, {
                id,
                temperature: temp,
                time,
                day,
              });
              DATA.sort(function(a, b) {
                if (a.time > b.time) {
                  return 1;
                }
                if (a.time < b.time) {
                  return -1;
                }
                return 0;
              });
              const DATA2 = [];
              const temps = DATA.map(item => item.temperature);
              if (DATA.length > 0) {
                for (let i = 0; i < DATA.length; i++) {
                  DATA2[i] = {
                    temperature:
                      temps[i] < 16 && temps[i] > -1
                        ? String(`0${(temps[i]).toString(16)}`)
                        : temps[i] < 0
                          ? String((256 + temps[i]).toString(16))
                          : String((temps[i]).toString(16)),
                    time: time[i],
                  };
                }
              }
              console.log(id, temp, time, day, DATA2, 'Changed HEX data');
              
              close();
            },
          });
        }}
        style={styles.item}
      >
        <View style={styles.inside}>
          <Text style={styles.title}>#{id}</Text>
          <Divider style={styles.divider} />
          <FontAwesomeIcon icon={faThermometerHalf} color="#474747" size={20} />
          <Text style={styles.title}>
            {title}
            °C
          </Text>
          <Divider style={styles.divider} />
          <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={20} />
          <Text style={styles.title}>{this.convertMinsToTime(subTitle)}</Text>
          <Divider style={styles.divider} />
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <FontAwesomeIcon icon={faTrashAlt} color="#FF4040" size={18} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
    const renderItem = ({ item }) => (
      <Item title={item.temperature} subTitle={item.time} id={item.id} day={item.day} />
    );

    return (
      <View style={{ flex: 1 }}>
        <Tabs
          activeKey={this.state.activeKey}
          dataSource={this.state.d1}
          swipeable={true}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel>
            <TYFlatList data={monDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYFlatList data={tuyDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYFlatList data={wedDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYFlatList data={thuDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYFlatList data={friDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYFlatList data={satDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <TYFlatList data={sunDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}

ClimateProgramm.propTypes = {
  chart_1_part_1: PropTypes.string,
  chart_1_part_2: PropTypes.string,
  chart_1_part_3: PropTypes.string,
  chart_1_part_4: PropTypes.string,
};

ClimateProgramm.defaultProps = {
  chart_1_part_1: '0000000000',
  chart_1_part_2: '0000000000',
  chart_1_part_3: '0000000000',
  chart_1_part_4: '0000000000',
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  item: {
    backgroundColor: '#fff',
    borderLeftColor: '#90EE90',
    borderLeftWidth: 10,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: 'black',
    alignContent: 'center',
  },
  inside: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  tempPicker: {
    width: 70,
    height: 200,
  },
  timerPicker: {
    width: 200,
    height: 200,
  },
  divider: {
    flexDirection: 'column',
    color: 'black',
    height: 20,
  },
  title: {
    // fontSize: 32,
    color: '#474747',
  },
});

export default connect(({ dpState }) => ({
  chart_1_part_1: dpState[chart_1_part_1Code],
  chart_1_part_2: dpState[chart_1_part_2Code],
  chart_1_part_3: dpState[chart_1_part_3Code],
  chart_1_part_4: dpState[chart_1_part_4Code],
}))(ClimateProgramm);
