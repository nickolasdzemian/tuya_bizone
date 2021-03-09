/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {
  TYSdk,
  TYFlatList,
  Popup,
  Tabs,
  Divider,
  TimerPicker,
  Picker,
} from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faThermometerHalf,
  faBusinessTime,
  faTrashAlt,
  faChartPie,
  faPlusCircle,
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
const pointadd = Strings.getLang('pointadd');

const {
  chart_1_part_1: chart_1_part_1Code,
  chart_1_part_2: chart_1_part_2Code,
  chart_1_part_3: chart_1_part_3Code,
  chart_1_part_4: chart_1_part_4Code,
} = dpCodes;

// const Res = {
//   hue: require('../../../res/hue.png'),
// };

class ChartClimateScene extends Component {
  constructor(props) {
    super(props);

    const I = this.props.chart_1_part_1;
    const II = this.props.chart_1_part_2;
    const III = this.props.chart_1_part_3;
    const IV = this.props.chart_1_part_4;
    const Ipart = I.length < 6 ? 0 : I.length / 6;
    const IIpart = II.length < 6 ? 0 : II.length / 6;
    const IIIpart = III.length < 6 ? 0 : III.length / 6;
    const IVpart = IV.length < 6 ? 0 : IV.length / 6;

    const date = new Date();
    
    this.state = {
      god: Ipart + IIpart + IIIpart + IVpart,
      data: this._getLenth() > 0 ? this._getAll() : null,
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
      dutemps: _.range(-15, 81),
      stepperValue: 6,
      timeSelectionValue: 366,
    };
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

  dayToMin() {
    const day = this.state.activeKey;
    const time = this.state.timeSelectionValue;
    const DTM = day === 1
      ? time
      : day === 2
        ? time + 1440
        : day === 3
          ? time + 2880
          : day === 4
            ? time + 4320
            : day === 5
              ? time + 5760
              : day === 6
                ? time + 7200
                : day === 7
                  ? time + 8640
                  : null;
    return DTM;              
  }

  _getLenth() {
    const I = this.props.chart_1_part_1;
    const II = this.props.chart_1_part_2;
    const III = this.props.chart_1_part_3;
    const IV = this.props.chart_1_part_4;
    const Ipart = I.length < 6 ? 0 : I.length / 6;
    const IIpart = II.length < 6 ? 0 : II.length / 6;
    const IIIpart = III.length < 6 ? 0 : III.length / 6;
    const IVpart = IV.length < 6 ? 0 : IV.length / 6;
    const LENA = Ipart + IIpart + IIIpart + IVpart;
    // this.setState({god: LENA});
    return LENA;
  }

  _getAll() {
    const I = this.props.chart_1_part_1;
    const II = this.props.chart_1_part_2;
    const III = this.props.chart_1_part_3;
    const IV = this.props.chart_1_part_4;
    const part1 = I.length > 6 ? I : '';
    const part2 = II.length > 6 ? II : '';
    const part3 = III.length > 6 ? III : '';
    const part4 = IV.length > 6 ? IV : '';
    const part0 = (part1 + part2 + part3 + part4).match(/(......?)/g);
    const temp = part0.map(item =>
      parseInt(item.substring(4, 6), 16) > 100
        ? parseInt(item.substring(4, 6), 16) - 256
        : parseInt(item.substring(4, 6), 16)
    );
    const time = part0.map(item => parseInt(item.substring(0, 4), 16));
    const Data = [];
    if (this._getLenth() > 0) {
      for (let i = 0; i < this._getLenth(); i++) {
        Data[i] = {
          id: i,
          temperature: temp[i],
          time: time[i],
          day:
            time[i] < 1440
              ? 1
              : time[i] > 1439 && time[i] < 2880
                ? 2
                : time[i] > 2879 && time[i] < 4320
                  ? 3
                  : time[i] > 4319 && time[i] < 5760
                    ? 4
                    : time[i] > 5759 && time[i] < 7200
                      ? 5
                      : time[i] > 7199 && time[i] < 8640
                        ? 6
                        : time[i] > 8639 && time[i] < 10081
                          ? 7
                          : TYNative.simpleTipDialog(`${Strings.getLang('UERROR')} GetAll-time`, () => {}),
        };
      }
    }
    this.setState({god: Data.length});
    console.log('chart for list', Data);
    return Data;
  }

  async _add0point() {
    const day = this.state.activeKey;
    const temp = this.state.stepperValue;
    const time = this.dayToMin();
    const DATA = [];
    for (let i = 0; i < 1; i++) {
      DATA[i] = {
        id: '+',
        temperature: temp,
        time,
        day,
      };
    } () =>
      this.setState({data: DATA, god: DATA.length});
    const DATA2 = [];
    const temps = DATA.map(item => item.temperature);
    const times = DATA.map(item => item.time);
    if (DATA.length > 0) {
      for (let i = 0; i < DATA.length; i++) {
        DATA2[i] = {
          time:
          times[i] < 16 && times[i] >= 0
            ? String(`000${(times[i]).toString(16)}`) 
            : times[i] > 15 && times[i] < 255
              ? String(`00${(times[i]).toString(16)}`) 
              : times[i] > 254 && times[i] < 4096
                ? String(`0${(times[i]).toString(16)}`) 
                : times[i] > 4095 && times[i] < 10080
                  ? String(`${(times[i]).toString(16)}`)
                  : TYNative.simpleTipDialog(`${Strings.getLang('UERROR')} Send-time0`, () => {}),
          temperature:
          temps[i] < 16 && temps[i] > -1
            ? String(`0${(temps[i]).toString(16)}`)
            : temps[i] < 0
              ? String((256 + temps[i]).toString(16))
              : temps[i] > 15
                ? String((temps[i]).toString(16))
                : TYNative.simpleTipDialog(`${Strings.getLang('UERROR')} Send-temp0`, () => {}),
        };
      }
    }
    let part1 = DATA2.slice(0, 84);
    part1 = part1.map(a => (Object.values(a)).join('')).join('');
    part1 = JSON.parse(JSON.stringify(part1));
    TYDevice.putDeviceData({
      [chart_1_part_1Code]: part1,
    });
  }

  _addpoint() {
    const day = this.state.activeKey;
    const temp = this.state.stepperValue;
    const time = this.dayToMin();
    const DATA = this._getAll();
    DATA.push({
      id: '*',
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
    const times = DATA.map(item => item.time);
    if (DATA.length > 0) {
      for (let i = 0; i < DATA.length; i++) {
        DATA2[i] = {
          time:
          times[i] < 16 && times[i] >= 0
            ? String(`000${(times[i]).toString(16)}`) 
            : times[i] > 15 && times[i] < 255
              ? String(`00${(times[i]).toString(16)}`) 
              : times[i] > 254 && times[i] < 4096
                ? String(`0${(times[i]).toString(16)}`) 
                : times[i] > 4095 && times[i] < 10080
                  ? String(`${(times[i]).toString(16)}`)
                  : TYNative.simpleTipDialog(`${Strings.getLang('UERROR')} Send-time+`, () => {}),
          temperature:
          temps[i] < 16 && temps[i] > -1
            ? String(`0${(temps[i]).toString(16)}`)
            : temps[i] < 0
              ? String((256 + temps[i]).toString(16))
              : temps[i] > 15
                ? String((temps[i]).toString(16))
                : TYNative.simpleTipDialog(`${Strings.getLang('UERROR')} Send-temp+`, () => {}),
        };
      }
    }
    this.setState({data: DATA, god: DATA.length}, () => {
      for (let i = 1; i < DATA.length; i++)
        if (DATA[i - 1].time >= DATA[i].time) {
          this.setState({data: this._getAll(), god: this._getLenth()});
          TYNative.simpleTipDialog(`${Strings.getLang('sametimeerr')}`, () => {});
          break;
        } else {
        
          let part1 = DATA2.slice(0, 84);
          part1 = part1.map(a => (Object.values(a)).join('')).join('');
          part1 = JSON.parse(JSON.stringify(part1));
          TYDevice.putDeviceData({
            [chart_1_part_1Code]: part1,
          });
          let part2 = DATA2.slice(84, 168);
          part2 = part2.map(a => (Object.values(a)).join('')).join('');
          part2 = JSON.parse(JSON.stringify(part2));
          part2.length === 0 ? null : 
            TYDevice.putDeviceData({
              [chart_1_part_2Code]: part2,
            });
          let part3 = DATA2.slice(168, 252);
          part3 = part3.map(a => (Object.values(a)).join('')).join('');
          part3 = JSON.parse(JSON.stringify(part3));
          part3.length === 0 ? null : 
            TYDevice.putDeviceData({
              [chart_1_part_3Code]: part3,
            });
          let part4 = DATA2.slice(252, 336); 
          part4 = part4.map(a => (Object.values(a)).join('')).join('');
          part4 = JSON.parse(JSON.stringify(part4));
          part4.length === 0 ? null :
            TYDevice.putDeviceData({
              [chart_1_part_4Code]: part4,
            });
          console.log(temp, time, day, DATA2, 'Changed HEX data');
          console.log(part1, 'DATA 1');
          console.log(part2, 'DATA 2');
          console.log(part3, 'DATA 3');
          console.log(part4, 'DATA 4');
          break;
        }
    }); 
  };

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  _handleD1Change = tab => {
    this.setState({ activeKey: tab.value });
  };

  render() {
    const G = this.state.god;
    const ICO = <FontAwesomeIcon icon={faChartPie} color="#FF7300" size={50} style={styles.info} marginVertical="40%" />;
    const DATA = this.state.data;
    const ADDPOINT = (
      <TouchableOpacity
        activeOpacity={0.6}
        underlayColor="#90EE90"
        onLongPress={G < 336 ? () => {
          this.setState({
            stepperValue: 6,
            timeSelectionValue: 366,
          });
          const ADay = this.state.activeKey;
          const day = ADay === 1 ? 'mon' :
            ADay === 2 ? 'tuу' :
              ADay === 3 ? 'wed' :
                ADay === 4 ? 'thu' :
                  ADay === 5 ? 'fri' :
                    ADay === 6 ? 'sat' :
                      ADay === 7 ? 'sun' : alert(Strings.getLang('UERROR'));
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
                  // loop={true} - not working with iOS 14 and above
                  itemStyle={styles.tempPicker}
                  selectedValue={this.state.stepperValue}
                  onValueChange={stepperValue =>
                    this.setState({
                      stepperValue: parseInt(stepperValue, 10),
                    })}
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
                    alignSelf: 'center',
                    height: 100,
                    marginLeft: 20,
                    margin: 20,
                  }}
                />
                <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={25} />
                <TimerPicker
                  style={styles.timerPicker}
                  startTime={this.state.timeSelectionValue}
                  is12Hours={false}
                  singlePicker={true}
                  onTimerChange={timeSelectionValue => this.setState({ timeSelectionValue })}
                />
              </View>
            ),
            title: pointadd + Strings.getLang(day),
            cancelText,
            confirmText,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (idx, { close }) => {G > 0 ? this._addpoint() : this._add0point(); close();},
          });
        } : null}
        style={styles.item}
      >
        {G < 336 ? <FontAwesomeIcon icon={faPlusCircle} color="#90EE90" size={30} />
          : <FontAwesomeIcon icon={faPlusCircle} color="#d6d6d6" size={30} />}
      </TouchableOpacity>);
    const monDATA = G > 0 ? this.state.data.filter(item => item.day === 1) : null;
    const tuyDATA = G > 0 ? this.state.data.filter(item => item.day === 2) : null;
    const wedDATA = G > 0 ? this.state.data.filter(item => item.day === 3) : null;
    const thuDATA = G > 0 ? this.state.data.filter(item => item.day === 4) : null;
    const friDATA = G > 0 ? this.state.data.filter(item => item.day === 5) : null;
    const satDATA = G > 0 ? this.state.data.filter(item => item.day === 6) : null;
    const sunDATA = G > 0 ? this.state.data.filter(item => item.day === 7) : null;
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
                  // loop={true} - not working with iOS 14 and above
                  itemStyle={styles.tempPicker}
                  selectedValue={title}
                  onValueChange={stepperValue =>
                    this.setState({
                      stepperValue: parseInt(stepperValue, 10),
                    })}
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
              time = this.dayToMin(day);
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
              const times = DATA.map(item => item.time);
              // this.setState({data: DATA});
              if (DATA.length > 0) {
                for (let i = 0; i < DATA.length; i++) {
                  DATA2[i] = {
                    time:
                        times[i] < 16 && times[i] > 0
                          ? String(`000${(times[i]).toString(16)}`) 
                          : times[i] > 15 && times[i] < 255
                            ? String(`00${(times[i]).toString(16)}`) 
                            : times[i] > 254 && times[i] < 4096
                              ? String(`0${(times[i]).toString(16)}`) 
                              : times[i] > 4095 && times[i] < 10080
                                ? String(`${(times[i]).toString(16)}`)
                                : alert(Strings.getLang('UERROR')),
                    temperature:
                        temps[i] < 16 && temps[i] > -1
                          ? String(`0${(temps[i]).toString(16)}`)
                          : temps[i] < 0
                            ? String((256 + temps[i]).toString(16))
                            : temps[i] > 15
                              ? String((temps[i]).toString(16))
                              : alert(Strings.getLang('UERROR')),
                  };
                }
              }
              for (let i = 1; i < DATA.length; i++)
                if (DATA[i - 1].time >= DATA[i].time) {
                  this.setState({data: this._getAll(), god: this._getLenth()});
                  TYNative.simpleTipDialog(`${Strings.getLang('sametimeerr')}`, () => {});
                  break;
                } else {
                  this.setState({data: DATA, god: DATA.length});
                  let part1 = DATA2.slice(0, 84);
                  const P1L =
                    part1.length < 16
                      ? String(`000${(part1.length).toString(16)}`)
                      : String(`00${(part1.length).toString(16)}`);
                  part1 = part1.map(a => (Object.values(a)).join('')).join('');
                  part1 = JSON.parse(JSON.stringify(P1L + part1));
                  TYDevice.putDeviceData({
                    [chart_1_part_1Code]: part1,
                  });
                  let part2 = DATA2.slice(84, 168);
                  const P2L =
                    part2.length < 16
                      ? String(`000${(part2.length).toString(16)}`)
                      : String(`00${(part2.length).toString(16)}`);
                  part2 = part2.map(a => (Object.values(a)).join('')).join('');
                  part2 = JSON.parse(JSON.stringify(P2L + part2));
                  // TYDevice.putDeviceData({
                  //   [chart_1_part_2Code]: part2.length === 0 ? null : part2,
                  // });
                  let part3 = DATA2.slice(168, 252);
                  const P3L =
                    part3.length < 16
                      ? String(`000${(part3.length).toString(16)}`)
                      : String(`00${(part3.length).toString(16)}`);
                  part3 = part3.map(a => (Object.values(a)).join('')).join('');
                  part3 = JSON.parse(JSON.stringify(P3L + part3));
                  // TYDevice.putDeviceData({
                  //   [chart_1_part_3Code]: part3.length === 0 ? null : part3,
                  // });
                  let part4 = DATA2.slice(252, 336); 
                  const P4L =
                    part4.length < 16
                      ? String(`000${(part4.length).toString(16)}`)
                      : String(`00${(part4.length).toString(16)}`);
                  part4 = part4.map(a => (Object.values(a)).join('')).join('');
                  part4 = JSON.parse(JSON.stringify(P4L + part4));
                  // if (part4.length > 0) {
                  //   TYDevice.putDeviceData({
                  //     [chart_1_part_4Code]: part4,
                  //   });
                  // }
                  console.log(temp, time, day, DATA2, 'Changed HEX data');
                  console.log(part1, 'DATA 1');
                  console.log(part2, 'DATA 2');
                  console.log(part3, 'DATA 3');
                  console.log(part4, 'DATA 4');
                }
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
        <Text style={styles.info}>{G !== 0 ? `${336 - G}${Strings.getLang('pointleft')}` : Strings.getLang('nullcharts')}</Text>
        <Divider />
        <Tabs
          activeKey={this.state.activeKey}
          dataSource={this.state.d1}
          swipeable={true}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={monDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={tuyDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={wedDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={thuDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={friDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={satDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            <TYFlatList data={sunDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}

ChartClimateScene.propTypes = {
  chart_1_part_1: PropTypes.string,
  chart_1_part_2: PropTypes.string,
  chart_1_part_3: PropTypes.string,
  chart_1_part_4: PropTypes.string,
};

ChartClimateScene.defaultProps = {
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
    backgroundColor: '#fafafa',
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
    height: 20,
  },
  title: {
    color: '#474747',
  },
  info: {
    color: '#474747',
    textAlign: 'center',
    margin: 15,
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default connect(({ dpState }) => ({
  chart_1_part_1: dpState[chart_1_part_1Code],
  chart_1_part_2: dpState[chart_1_part_2Code],
  chart_1_part_3: dpState[chart_1_part_3Code],
  chart_1_part_4: dpState[chart_1_part_4Code],
}))(ChartClimateScene);
