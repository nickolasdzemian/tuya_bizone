/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  AsyncStorage, 
} from 'react-native';
import { SwipeListView} from 'react-native-swipe-list-view';
import {
  TYSdk,
  Popup,
  Tabs,
  Divider,
  TimerPicker,
  Picker,
  TYText, 
} from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faThermometerHalf,
  faBusinessTime,
  faTrashAlt,
  faChartPie,
  faPlus,
  faListOl,
  faCogs,
  faCopy,
  // faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Cache } from 'react-native-cache';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');
const btndelete = Strings.getLang('btndelete');
const pointset = Strings.getLang('pointset');
const pointadd = Strings.getLang('pointadd');
const pointdelete = Strings.getLang('pointdelete');

const {
  chart_2_part_1: chart_2_part_1Code,
  chart_2_part_2: chart_2_part_2Code,
  chart_2_part_3: chart_2_part_3Code,
  chart_2_part_4: chart_2_part_4Code,
} = dpCodes;

const cache = new Cache({
  namespace: 'ChartTemp2',
  policy: {
    maxEntries: 50000
  },
  backend: AsyncStorage
});

class ChartTemp2 extends PureComponent {
  constructor(props) {
    super(props);

    const EVA = parseInt(this.props.chart_2_part_1.substring(0, 4), 16);

    const date = new Date();
    
    this.state = {
      god: EVA > 0 ? EVA : 0,
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
      // dutemps: _.range(-15, 81),
      dutemps: _.range(5, 46),
      apl: false,
    };
  }

  componentWillReceiveProps() {
    if (this._getLenth() !== this.state.god) {
      this.setState({ apl: true });
      this._getLenth() === 0 ? setTimeout(() => { this.setState({ apl: false }); }, 2000) : null;
    }

    if (this._getLenth() === this.state.god) {
      setTimeout(() => { this.setState({ apl: false, god: this._getLenth() }); }, 3000);
    }
  }

  convertMinsToTime = mins => {
    let hours =
      mins < 1440
        ? mins / 60
        : mins > 1439 && mins < 2880
          ? (mins - 1440) / 60
          : mins > 2879 && mins < 4320
            ? (mins - 2880) / 60
            : mins > 4319 && mins < 5760
              ? (mins - 4320) / 60
              : mins > 5759 && mins < 7200
                ? (mins - 5760) / 60
                : mins > 7199 && mins < 8640
                  ? (mins - 7200) / 60
                  : mins > 8639 && mins < 10081
                    ? (mins - 8640) / 60
                    : null;
    hours = hours < 10 ? `0${Math.floor(hours)}` : Math.floor(hours);
    let minutes = mins % 60;
    minutes = minutes < 10 ? `0${Math.floor(minutes)}` : Math.floor(minutes);
    return `${hours}:${minutes}`;
  };

  convertMinsToMins = mins => {
    const MMM =
      mins < 1440
        ? mins
        : mins > 1439 && mins < 2880
          ? mins - 1440
          : mins > 2879 && mins < 4320
            ? mins - 2880
            : mins > 4319 && mins < 5760
              ? mins - 4320
              : mins > 5759 && mins < 7200
                ? mins - 5760
                : mins > 7199 && mins < 8640
                  ? mins - 7200
                  : mins > 8639 && mins < 10081
                    ? mins - 8640
                    : null;
    return Math.floor(MMM);
  };

  dayToMin = time => {
    const day = this.state.activeKey;
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
    const EVA = parseInt(this.props.chart_2_part_1.substring(0, 4), 16);
    const LENA = EVA > 0 ? EVA : 0;
    return LENA;
  }

  _getAll() {
    const L = this._getLenth();
    const I = this.props.chart_2_part_1.substring(4);
    const II = this.props.chart_2_part_2.substring(4);
    const III = this.props.chart_2_part_3.substring(4);
    const IV = this.props.chart_2_part_4.substring(4);
    const EVA = parseInt(this.props.chart_2_part_1.substring(0, 4), 16);
    const part1 = EVA > 0 ? I : '000000';
    const part2 = EVA > 0 ? II : '';
    const part3 = EVA > 0 ? III : '';
    const part4 = EVA > 0 ? IV : '';
    const part0 = (part1 + part2 + part3 + part4).match(/(......?)/g);
    const temp = part0.map(item => parseInt(item.substring(4, 6), 16));
    const time = part0.map(item => parseInt(item.substring(0, 4), 16));
    const Data = [];
    if (L > 0) {
      for (let i = 0; i < L; i++) {
        Data[i] = {
          id: i,
          temperature: temp[i] > 100 ? temp[i] - 256 : temp [i],
          time: time[i],
          day: Math.floor(time[i] / 1440) + 1,
        };
      }
    }
    return Data;
  }

  async _addpoint() {
    const day = this.state.activeKey;
    const temp = await cache.get('temp');
    const itime = await cache.get('time');
    const time = this.dayToMin(itime === undefined ? 0 : itime);
    const DATA = this._getAll();
    DATA.push({
      id: '+',
      temperature: temp === undefined ? 0 : temp,
      time,
      day,
    });
    this._sender(DATA);
  };

  async _editPoint(id, day) {
    const DATA = this._getAll();
    const temp = await cache.get('temp');
    const itime = await cache.get('time');
    const time = this.dayToMin(itime === undefined ? 0 : itime);
    DATA.splice(id, 1, {
      id,
      temperature: temp === undefined ? 0 : temp,
      time,
      day,
    });
    this.setState({apl: true});
    this._sender(DATA);
  };

  _deletePoint(id, title, subTitle) {
    Popup.custom({
      content: (
        <View
          style={{
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: 8,
          }}
        >
          <TYText style={styles.deletet}>{Strings.getLang('pointdeltext')}</TYText>
          <TYText style={styles.title}>
            {'#'}
            {id + 1}
            {':   '}
            {title}
            {'°C  '}
            {this.convertMinsToTime(subTitle)}
          </TYText>
        </View>
      ),
      title: pointdelete,
      cancelText,
      confirmText: btndelete,
      onMaskPress: ({ close }) => {
        close();
      },
      onConfirm: (idx, { close }) => {
        const DATA = this._getAll();
        DATA.splice(id, 1);
        close();  
        this._sender(DATA);
      },
    });
  };

  async _copyDayB() {
    const D = this.state.activeKey;
    const oldDATA = this._getAll();
    const dayDATA = oldDATA.filter(item => item.day === D);
    const newdayDATA = [];
    const newtemp = dayDATA.map(item => item.temperature);
    const newtime = dayDATA.map(item => item.time);
    const newday = dayDATA.map(item => item.day);
    if (dayDATA.length > 0) {
      for (let i = 0; i < dayDATA.length; i++) {
        newdayDATA[i] = {
          id: i,
          temperature: newtemp[i],
          time: newtime[i] - 1440,
          day: newday[i] - 1,
        };
      }
    }
    const day = oldDATA.map(item => item.day);
    for (let i = oldDATA.length - 1; i >= 0; i--) {
      if (day[i] === D - 1) {
        oldDATA.splice(i, 1);
      }
    }
    const DATA = oldDATA.concat(newdayDATA);
    if (DATA.length >= 336) {TYNative.simpleTipDialog(`${Strings.getLang('maxitems')}`, () => {});} else {
      this._sender(DATA);
      this.setState({activeKey: D - 1});
    }
  };

  async _copyDayF() {
    const D = this.state.activeKey;
    const oldDATA = this._getAll();
    const dayDATA = oldDATA.filter(item => item.day === D);
    const newdayDATA = [];
    const newtemp = dayDATA.map(item => item.temperature);
    const newtime = dayDATA.map(item => item.time);
    const newday = dayDATA.map(item => item.day);
    if (dayDATA.length > 0) {
      for (let i = 0; i < dayDATA.length; i++) {
        newdayDATA[i] = {
          id: i,
          temperature: newtemp[i],
          time: newtime[i] + 1440,
          day: newday[i] + 1,
        };
      }
    }
    const day = oldDATA.map(item => item.day);
    for (let i = oldDATA.length - 1; i >= 0; i--) {
      if (day[i] === D + 1) {
        oldDATA.splice(i, 1);
      }
    }
    const DATA = oldDATA.concat(newdayDATA);
    if (DATA.length >= 336) {TYNative.simpleTipDialog(`${Strings.getLang('maxitems')}`, () => {});} else {
      this._sender(DATA);
      this.setState({activeKey: D + 1});
    }
  };

  _deleteDay() {
    const DATA = this._getAll();
    const day = DATA.map(item => item.day);
    for (let i = DATA.length - 1; i >= 0; i--) {
      if (day[i] === this.state.activeKey) {
        DATA.splice(i, 1);
      }
    }
    this._sender(DATA);
  };

  _deleteAll() {
    Popup.custom({
      content: (
        <View
          style={{
            height: 130,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: 8,
          }}
        >
          <TYText style={styles.deletet}>{Strings.getLang('allpointdeltext')}</TYText>
        </View>
      ),
      title: Strings.getLang('allpointdeltitle'),
      cancelText,
      confirmText: btndelete,
      onMaskPress: ({ close }) => {
        close();
      },
      onConfirm: (idx, { close }) => {
        close();
        TYDevice.putDeviceData({
          [chart_2_part_1Code]: '000000',
          [chart_2_part_2Code]: '000000',
          [chart_2_part_3Code]: '000000',
          [chart_2_part_4Code]: '000000',
        });
        this.setState({god: 0});
      },
    });
  };

  _sender(DATA) {    
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
    const timeerror = () => {
      for (let i = 1; i < DATA.length; i++)
        if (DATA[i - 1].time >= DATA[i].time) {
          return 1;
        }
      return 0;
    };
    if (timeerror() === 1) {TYNative.simpleTipDialog(`${Strings.getLang('sametimeerr')}`, () => {});} else {
      const L10 = DATA2.length;
      const L0 = (DATA2.length).toString(16);
      const L = L10 < 16 ? String(`000${L0}`) : L10 > 15 && L10 < 256 ? String(`00${L0}`) : String(`0${L0}`);

      let part1 = DATA2.slice(0, 84);
      part1 = part1.map(a => (Object.values(a)).join('')).join('');
      part1 = JSON.parse(JSON.stringify(part1));
      TYDevice.putDeviceData({
        [chart_2_part_1Code]: part1.length === 0 ? String(`${L}00`) : String(L + part1),
      });
      let part2 = DATA2.slice(84, 168);
      part2 = part2.map(a => (Object.values(a)).join('')).join('');
      part2 = JSON.parse(JSON.stringify(part2));
      TYDevice.putDeviceData({
        [chart_2_part_2Code]: part2.length === 0 ? String(`${L}00`) : String(L + part2),
      });
      let part3 = DATA2.slice(168, 252);
      part3 = part3.map(a => (Object.values(a)).join('')).join('');
      part3 = JSON.parse(JSON.stringify(part3));
      TYDevice.putDeviceData({
        [chart_2_part_3Code]: part3.length === 0 ? String(`${L}00`) : String(L + part3),
      });
      let part4 = DATA2.slice(252, 336); 
      part4 = part4.map(a => (Object.values(a)).join('')).join('');
      part4 = JSON.parse(JSON.stringify(part4));
      TYDevice.putDeviceData({
        [chart_2_part_4Code]: part4.length === 0 ? String(`${L}00`) : String(L + part4),
      });
    }
  };

  _handleD1Change = tab => {
    this.setState({ activeKey: tab.value });
  };

  _selector(temp, time) {
    const selector = (
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
          theme={{ fontSize: 20 }}
          // loop={true} - not working with iOS 14 and above
          itemStyle={styles.tempPicker}
          selectedValue={temp}
          onValueChange={stepperValue =>
            cache.set('temp', stepperValue)}
        >
          {this.state.dutemps.map(stepperValue => (
            <Picker.Item
              style={styles.tempPicker}
              theme={{ fontSize: 20 }}
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
          theme={{ fontSize: 20 }}
          startTime={time}
          is12Hours={false}
          singlePicker={true}
          onTimerChange={timeSelectionValue => 
            cache.set('time', timeSelectionValue)}
        />
      </View>);
    return selector;  
  };

  render() {
    const D = this.state.activeKey;
    const G = this.state.god;
    const A = this.state.apl;
    const DATA = this._getAll();
    const dayDATA = DATA.filter(item => item.day === D);
    const L = G === 0 ? 0 : dayDATA.length;
    const monDATA = G > 0 ? DATA.filter(item => item.day === 1) : null;
    const tueDATA = G > 0 ? DATA.filter(item => item.day === 2) : null;
    const wedDATA = G > 0 ? DATA.filter(item => item.day === 3) : null;
    const thuDATA = G > 0 ? DATA.filter(item => item.day === 4) : null;
    const friDATA = G > 0 ? DATA.filter(item => item.day === 5) : null;
    const satDATA = G > 0 ? DATA.filter(item => item.day === 6) : null;
    const sunDATA = G > 0 ? DATA.filter(item => item.day === 7) : null;
    const ICO = 
      (
        <View style={styles.info}>
          <FontAwesomeIcon icon={faChartPie} color="#FF7300" size={50} alignSelf="center" />
          <TYText style={styles.info}>
            {Strings.getLang('nullcharts')}
          </TYText>
        </View>
      );
    const ICODAY = 
    (
      <View style={styles.info}>
        <FontAwesomeIcon icon={faChartPie} color="#FF7300" size={50} alignSelf="center" />
        <TYText style={styles.info}>
          {Strings.getLang('nullchartsday')}
        </TYText>
      </View>
    );
    const ADDPOINT = (
      <View style={styles.edit}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={
            G === 336 ? TYNative.simpleTipDialog(`${Strings.getLang('maxitems')}`, () => {}) 
              : A === true ? null 
                : () => {
                  const temp = 6;
                  const time = 366;
                  cache.set('temp', temp);
                  cache.set('time', time);
                  const day = D === 1 ? 'mon' :
                    D === 2 ? 'tuу' :
                      D === 3 ? 'wed' :
                        D === 4 ? 'thu' :
                          D === 5 ? 'fri' :
                            D === 6 ? 'sat' :
                              D === 7 ? 'sun' : alert(Strings.getLang('UERROR'));
                  Popup.custom({
                    content: (this._selector(temp, time)),
                    title: pointadd + Strings.getLang(day),
                    cancelText,
                    confirmText,
                    onMaskPress: ({ close }) => {
                      close();
                    },
                    onConfirm: (idx, { close }) => {this._addpoint(); close();},
                  });
                }
          }
          style={styles.insideADD}
        >
          <FontAwesomeIcon icon={faPlus} color={G >= 336 || A === true ? '#d6d6d6' : '#ff7300'} size={20} />
          <TYText style={styles.titleADD}>{Strings.getLang('addNew')}</TYText>  
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.insideADD} 
          onPress={() => {
            this.setState({god: this._getLenth()});
          }}
        >
          <FontAwesomeIcon icon={faListOl} color={G >= 336 || A === true ? '#d6d6d6' : '#ff7300'} size={20} />
          <TYText style={styles.titleADD}>{G !== 0 ? `${336 - G}${Strings.getLang('pointleft')}` : `${336}${Strings.getLang('pointleft')}`}</TYText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.insideADD} 
          onPress={G === 0 || A === true || L === 0 ? null : () => {
            Popup.custom({
              content: (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    padding: 8,
                  }}
                >
                  {D === 1 ? null : (
                    <TouchableOpacity 
                      style={styles.insideADD}
                      onPress={() => {
                        Popup.close();
                        this._copyDayB();
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} color="#ff7300" size={20} />
                      <TYText style={styles.title}>{Strings.getLang('copyB')}</TYText>
                      <Divider style={{width: 500, marginBottom: 10, marginTop: 10}} />
                    </TouchableOpacity>)}
                  {D === 7 ? null : (
                    <TouchableOpacity 
                      style={styles.insideADD}
                      onPress={() => { 
                        Popup.close();
                        this._copyDayF();
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} color="#ff7300" size={20} />
                      <TYText style={styles.title}>{Strings.getLang('copyF')}</TYText>
                      <Divider style={{width: 500, marginBottom: 10, marginTop: 10}} />
                    </TouchableOpacity>)}
                  <TouchableOpacity 
                    style={styles.insideADD} 
                    onPress={() => {
                      Popup.close();
                      this._deleteDay();
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} color="#FF4040" size={18} />
                    <TYText style={styles.title}>{Strings.getLang('eraseday')}</TYText>
                  </TouchableOpacity>
                  {/* <View>
                    <Divider style={{marginBottom: 10, marginTop: 10}} />
                    <FontAwesomeIcon icon={faInfoCircle} size={16} margin={10} alignSelf="center" />
                    <TYText style={styles.annotation}>
                      {Strings.getLang('copyNote')}
                    </TYText>
                  </View> */}
                </View>
              ),
              title: Strings.getLang('adtnopt'),
              cancelText,
              confirmText: 'OK',
              onMaskPress: ({ close }) => {
                close();
              },
              onConfirm: (idx, { close }) => {
                close();  
              },
            });
          }}
        >
          <FontAwesomeIcon icon={faCogs} color={(G === 0 && L === 0) || A === true ? '#d6d6d6' : '#ff7300'} size={20} />
          <TYText style={styles.titleADD}>{Strings.getLang('options')}</TYText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.insideADD}
          onPress={G === 0 ? null : () => {this._deleteAll();}}
        >
          <FontAwesomeIcon icon={faTrashAlt} color={G === 0 || A === true ? '#d6d6d6' : '#FF4040'} size={20} />
          <TYText style={styles.titleADD}>{Strings.getLang('deleteAll')}</TYText>
        </TouchableOpacity>
      </View>);

    const empty = () => (
      <View>
        <TYText style={styles.wait}>{Strings.getLang('apl2')}</TYText>
        <ActivityIndicator color="#ff7300" /> 
      </View>
    );

    const Item = ({ id, title, subTitle }) => (
      <View style={styles.item}>
        <TYText style={styles.title}>{id + 1}</TYText>
        <Divider style={styles.divider} />
        <FontAwesomeIcon icon={faThermometerHalf} color="#474747" size={20} />
        <TYText style={styles.title}>
          {title}
          °C
        </TYText>
        <Divider style={styles.divider} />
        <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={20} />
        <TYText style={styles.title}>{this.convertMinsToTime(subTitle)}</TYText>
      </View>
    );
    const renderItem = ({ item }) => (
      <Item title={item.temperature} subTitle={item.time} id={item.id} day={item.day} />
    );
    const renderHiddenItem = ({ item }) => (
      <View style={styles.backitem}>
        <TouchableOpacity
          style={styles.e}
          onPress={() => {
            const temp = item.temperature;
            const time = this.convertMinsToMins(item.time);
            cache.set('temp', temp);
            cache.set('time', time);
            Popup.custom({
              content: (this._selector(temp, time)),
              title: pointset,
              cancelText,
              confirmText,
              onMaskPress: ({ close }) => {
                close();
              },
              onConfirm: (idx, { close }) => {
                close();
                this._editPoint(item.id, item.day);
              }});
          }}
        >
          <TYText style={styles.backTextWhite}>{Strings.getLang('edit')}</TYText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() =>{this._deletePoint(item.id, item.temperature, item.time);}}
        >
          <TYText style={styles.backTextWhite}>{Strings.getLang('dell')}</TYText>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        {ADDPOINT}
        {this.state.apl === true ? 
          <View>
            <TYText style={styles.wait}>{Strings.getLang('apl')}</TYText>
            <ActivityIndicator color="#ff7300" /> 
          </View> : null}
        <Tabs
          style={{borderRadius: 10, paddingBottom: 30, paddingTop: 1}}
          tabPosition="bottom"
          disabled={A === true}
          maxItem={7}
          activeKey={D}
          dataSource={this.state.d1}
          // swipeable={L === 0}
          swipeable={false}
          onChange={this._handleD1Change}
          preload={true}
          preloadTimeout={G * 15}
          renderPlaceholder={empty}
          animationConfig={{duration: 10000, delay: 10, useNativeDriver: false}}
          velocityThreshold={1}
          activeColor={A === true ? '#d6d6d6' : '#ff7300'}
          tabActiveTextStyle={{fontWeight: 'bold', fontSize: 20}}
          tabStyle={{width: 50}}
          tabActiveStyle={{backgroundColor: '#fff'}}
          underlineStyle={{backgroundColor: '#fff'}}
        >
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={monDATA}
              scrollEnabled={G === 0 || monDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              previewRowKey={0}
              previewOpenValue={90}
              previewOpenDelay={3000}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : monDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={tueDATA}
              scrollEnabled={G === 0 || tueDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : tueDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={wedDATA}
              scrollEnabled={G === 0 || wedDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : wedDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={thuDATA}
              scrollEnabled={G === 0 || thuDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : thuDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={friDATA}
              scrollEnabled={G === 0 || friDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : friDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={satDATA}
              scrollEnabled={G === 0 || satDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : satDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
          <Tabs.TabPanel style={styles.list}>
            <SwipeListView
              data={sunDATA}
              scrollEnabled={G === 0 || sunDATA.length > 7}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={82} 
              stopLeftSwipe={100}
              rightOpenValue={-70}
              stopRightSwipe={-100}
              keyExtractor={item => item.id}
              onRowOpen={(rowKey, rowMap) => {
                setTimeout(() => {
                  rowKey === null ? null : rowMap[rowKey].closeRow();
                }, 2300);
              }}
            />
            {G === 0 ? ICO : sunDATA.length === 0 ? ICODAY : null}
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}

ChartTemp2.propTypes = {
  chart_2_part_1: PropTypes.string,
  chart_2_part_2: PropTypes.string,
  chart_2_part_3: PropTypes.string,
  chart_2_part_4: PropTypes.string,
};

ChartTemp2.defaultProps = {
  chart_2_part_1: '000000',
  chart_2_part_2: '000000',
  chart_2_part_3: '000000',
  chart_2_part_4: '000000',
};

const styles = StyleSheet.create({
  backTextWhite: {
    color: '#FFF',
  },
  e: {
    height: 60,
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#ff7300',
    flexDirection: 'row',
    borderRadius: 6,
    marginHorizontal: 0,
  },
  backRightBtn: {
    height: 60,
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#FF4040',
    flexDirection: 'row-reverse',
    borderRadius: 8,
    marginHorizontal: 0,
  },
  backitem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f7f7f7',
    borderLeftColor: '#ff7300',
    borderRightColor: '#FF4040',
    borderLeftWidth: 5,
    borderRightWidth: 3,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 16,
    color: 'black',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fafafa',
    borderLeftColor: '#ff7300',
    borderRightColor: '#FF4040',
    borderLeftWidth: 5,
    borderRightWidth: 3,
    borderRadius: 12,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    color: 'black',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  edit: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 5,
    color: 'black',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  insideADD: {
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
  list: {
    padding: 0,
  },
  divider: {
    flexDirection: 'column',
    height: 20,
  },
  title: {
    color: '#474747',
  },
  titleADD: {
    color: '#474747',
    fontSize: 12,
    marginTop: 2,
  },
  deletet: {
    fontWeight: 'bold',
    color: 'red',
    margin: 20,
  },
  info: {
    flexWrap: 'wrap',
    color: '#474747',
    textAlign: 'center',
    margin: 30,
    alignSelf: 'center',
  },
  // annotation: {
  //   textAlign: 'center',
  //   fontWeight: '200',
  //   fontSize: 10,
  //   color: 'black',
  //   justifyContent: 'center',
  //   paddingBottom: 10,
  //   letterSpacing: 1,
  // },
  wait: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    paddingBottom: 1,
    letterSpacing: 1,
  },
});

export default connect(({ dpState }) => ({
  chart_2_part_1: dpState[chart_2_part_1Code],
  chart_2_part_2: dpState[chart_2_part_2Code],
  chart_2_part_3: dpState[chart_2_part_3Code],
  chart_2_part_4: dpState[chart_2_part_4Code],
}))(ChartTemp2);