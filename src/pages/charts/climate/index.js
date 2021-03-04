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
    const Ipart = parseInt(this.props.chart_1_part_1.substring(0, 4), 16);
    const IIpart = parseInt(this.props.chart_1_part_2.substring(0, 4), 16);
    const IIIpart = parseInt(this.props.chart_1_part_3.substring(0, 4), 16);
    const IVpart = parseInt(this.props.chart_1_part_4.substring(0, 4), 16);
    const date = new Date();
    console.log(date);
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

  _getLenth() {
    const Ipart = parseInt(this.props.chart_1_part_1.substring(0, 4), 16);
    const IIpart = parseInt(this.props.chart_1_part_2.substring(0, 4), 16);
    const IIIpart = parseInt(this.props.chart_1_part_3.substring(0, 4), 16);
    const IVpart = parseInt(this.props.chart_1_part_4.substring(0, 4), 16);
    const LENA = Ipart + IIpart + IIIpart + IVpart;
    console.log(LENA);
    // this.setState({god: LENA});
    return LENA;
  }

  _getAll() {
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
    const temp = part0.map(item =>
      parseInt(item.substring(4, 6), 16) > 100
        ? parseInt(item.substring(4, 6), 16) - 256
        : parseInt(item.substring(4, 6), 16)
    );
    const time = part0.map(item => parseInt(item.substring(0, 4), 16));
    const Data = [];
    if (this.state.god > 0) {
      for (let i = 0; i < this.state.god; i++) {
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
          let temp = this.state.stepperValue;
          let time = this.state.timeSelectionValue;
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
            title: pointadd + Strings.getLang(day),
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
              const DATA2 = [];            
              if (G !== 0) DATA.push({
                id: '+',
                temperature: temp,
                time,
                day,
              });
              if (G === 0) {
                for (let i = 0; i < 1; i++) {
                  DATA2[i] = {
                    id: i,
                    temperature: temp,
                    time,
                    day,
                  };
                }
              }
              if (G !== 0) DATA.sort(function(a, b) {
                if (a.time > b.time) {
                  return 1;
                }
                if (a.time < b.time) {
                  return -1;
                }
                return 0;
              });
              const temps = DATA.map(item => item.temperature);
              const times = DATA.map(item => item.time);
              // for (let i = 0; i < DATA.length; i++)
              //   if ((DATA[i + 1].time - DATA[i].time) === 0) {
              //     this.setState({error: true});
              //     TYNative.simpleTipDialog(Strings.getLang('sametimeerr'), () => {});
              //     break;
              //   };
              if (G !== 0) this.setState({data: DATA});
              if (G === 0) this.setState({data: DATA2});
              const LENA2 = DATA2.length;
              this.setState({god: LENA2});
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
                ? String(`000${(part1.length).toString(16)}`)
                : String(`00${(part1.length).toString(16)}`);
              part2 = part2.map(a => (Object.values(a)).join('')).join('');
              part2 = JSON.parse(JSON.stringify(P2L + part2));
              TYDevice.putDeviceData({
                [chart_1_part_2Code]: part2,
              });
              let part3 = DATA2.slice(168, 252);
              const P3L =
              part3.length < 16
                ? String(`000${(part3.length).toString(16)}`)
                : String(`00${(part3.length).toString(16)}`);
              part3 = part3.map(a => (Object.values(a)).join('')).join('');
              part3 = JSON.parse(JSON.stringify(P3L + part3));
              TYDevice.putDeviceData({
                [chart_1_part_3Code]: part3,
              });
              let part4 = DATA2.slice(252, 336); 
              const P4L =
              part1.length < 16
                ? String(`000${(part4.length).toString(16)}`)
                : String(`00${(part4.length).toString(16)}`);
              part4 = part4.map(a => (Object.values(a)).join('')).join('');
              part4 = JSON.parse(JSON.stringify(P4L + part4));
              TYDevice.putDeviceData({
                [chart_1_part_4Code]: part4,
              });
              console.log(temp, time, day, DATA2, 'Changed HEX data');
              console.log(part1, 'DATA 1');
              console.log(part2, 'DATA 2');
              console.log(part3, 'DATA 3');
              console.log(part4, 'DATA 4');
              close();
            },
          });
        } : null}
        style={styles.item}
      >
        {G < 336 ? <FontAwesomeIcon icon={faPlusCircle} color="#90EE90" size={30} />
          : <FontAwesomeIcon icon={faPlusCircle} color="#d6d6d6" size={30} />}
      </TouchableOpacity>);
    const monDATA = G > 0 ? this.state.data.filter(item => item.day === 'mon') : null;
    const tuyDATA = G > 0 ? this.state.data.filter(item => item.day === 'tuy') : null;
    const wedDATA = G > 0 ? this.state.data.filter(item => item.day === 'wed') : null;
    const thuDATA = G > 0 ? this.state.data.filter(item => item.day === 'thu') : null;
    const friDATA = G > 0 ? this.state.data.filter(item => item.day === 'fri') : null;
    const satDATA = G > 0 ? this.state.data.filter(item => item.day === 'sat') : null;
    const sunDATA = G > 0 ? this.state.data.filter(item => item.day === 'sun') : null;
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
              const times = DATA.map(item => item.time);
              // for (let i = 0; i < DATA.length; i++)
              //   if ((DATA[i + 1].time - DATA[i].time) === 0) {
              //     this.setState({error: true});
              //     TYNative.simpleTipDialog(Strings.getLang('sametimeerr'), () => {});
              //     break;
              //   };
              this.setState({data: DATA});
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
              // const LENA2 = DATA2.length;
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
                    ? String(`000${(part1.length).toString(16)}`)
                    : String(`00${(part1.length).toString(16)}`);
              part2 = part2.map(a => (Object.values(a)).join('')).join('');
              part2 = JSON.parse(JSON.stringify(P2L + part2));
              TYDevice.putDeviceData({
                [chart_1_part_2Code]: part2,
              });
              let part3 = DATA2.slice(168, 252);
              const P3L =
                  part3.length < 16
                    ? String(`000${(part3.length).toString(16)}`)
                    : String(`00${(part3.length).toString(16)}`);
              part3 = part3.map(a => (Object.values(a)).join('')).join('');
              part3 = JSON.parse(JSON.stringify(P3L + part3));
              TYDevice.putDeviceData({
                [chart_1_part_3Code]: part3,
              });
              let part4 = DATA2.slice(252, 336); 
              const P4L =
                  part1.length < 16
                    ? String(`000${(part4.length).toString(16)}`)
                    : String(`00${(part4.length).toString(16)}`);
              part4 = part4.map(a => (Object.values(a)).join('')).join('');
              part4 = JSON.parse(JSON.stringify(P4L + part4));
              TYDevice.putDeviceData({
                [chart_1_part_4Code]: part4,
              });
              console.log(id, temp, time, day, DATA2, 'Changed HEX data');
              console.log(part1, 'DATA 1');
              console.log(part2, 'DATA 2');
              console.log(part3, 'DATA 3');
              console.log(part4, 'DATA 4');
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
        <Text style={styles.info}>{G === 0 ? Strings.getLang('nullcharts') : `${336 - G}${Strings.getLang('pointleft')}`}</Text>
        <Divider />
        <Tabs
          activeKey={this.state.activeKey}
          dataSource={this.state.d1}
          swipeable={true}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
            <TYFlatList data={monDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
            <TYFlatList data={tuyDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
            <TYFlatList data={wedDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
            <TYFlatList data={thuDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
            <TYFlatList data={friDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
            <TYFlatList data={satDATA} renderItem={renderItem} keyExtractor={item => item.id} />
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            {ADDPOINT}
            {G === 0 ? ICO : null}
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
    color: 'black',
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
