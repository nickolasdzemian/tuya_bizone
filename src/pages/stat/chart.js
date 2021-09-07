/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import debounce from 'lodash/debounce';
import { Utils, TYSdk, Dialog, TYText, Divider, Popup, DatePicker } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarTimes, faCalendarAlt, faWeight, faBars, faChartBar, faChartLine, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
// import { BarChart } from 'react-native-chart-kit';
import { VictoryChart, VictoryBar, VictoryLine, Background, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory-native';
// import { decode } from '../../utils/base-64';
import dpCodes from '../../config/dpCodes.ts';
import LoadCapacity from '../setting/common/loadcap/loadcap';
// import { DefaultTransition } from 'tuya-panel-kit/@react-navigation/stack/TransitionConfigs/TransitionPresets';
import Strings from '../../i18n';
// import 'babel-polyfill';
// import { ScrollView } from 'react-native-gesture-handler';

const { 
  settingsCounter: settingsCounterCode,
  ClimateSelector: ClimateSelectorCode,
  chSelector: chSelectorCode,
} = dpCodes;
const { convertY: cy, isIos } = Utils.RatioUtils;
const TYNative = TYSdk.native;

class ChartView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataVictory: [],
      dataVictory2: [],
      startRender: false,
      dateStart: new Date(),
      dateEnd: new Date(),
      ini: true,
      isChart: true,
      zone: true,
      dp: 153,
      maxY: 200,
      maxX: 200,
      maxY2: 200,
      maxX2: 200,
    };
    this.periodSelect = 1; // 0-day, 1-month, 2-year
    this.dpID = 153;
    this.litrEnable = true;
    this.offset = 0;
    this.lineOrBar = false; // if folse then line else bar
    this.intervalText = '';
    this.interval = 0;
    TYSdk.native.showLoading({ title: Strings.getLang('load') });
    this.getLogs();
    this.getLogs2();
  }

  onChangePeriodDay = () => {
    this.periodSelect = 0;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: Strings.getLang('load') });
      this.getLogs();
      this.getLogs2();
    });
    this.forceUpdate();
  };

  onChangePeriodMonth = () => {
    this.periodSelect = 1;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: Strings.getLang('load') });
      this.getLogs();
      this.getLogs2();
    });
    this.forceUpdate();
  };

  onChangePeriodYear = () => {
    this.periodSelect = 2;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: Strings.getLang('load') });
      this.getLogs();
      this.getLogs2();
    });
    this.forceUpdate();
  };

  onChangeToLine = () => {
    this.lineOrBar = true;
    this.forceUpdate();
  };

  onChangeToBar = () => {
    this.lineOrBar = false;
    this.forceUpdate();
  };

  onChangeStepDown = () => {
    this.interval += 1;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: Strings.getLang('load') });
      this.getLogs();
      this.getLogs2();
    });
    this.forceUpdate();
  };

  onChangeStepUp = () => {
    if (this.interval === 0) return;
    this.interval -= 1;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: Strings.getLang('load') });
      this.getLogs();
      this.getLogs2();
    });
    this.forceUpdate();
  };

  getLog = interval => {
    return new Promise((resolve, reject) => {
      TYSdk.device.getDeviceInfo().then(res => {
        const { devId } = res;
        const currentData = this.state.dateEnd;
        if (this.periodSelect === 0) {
          // for curent day
          if (interval > 0) {
            currentData.setDate(currentData.getDate() - interval);
          }
          const timeForDrowing = Utils.TimeUtils.dateFormat('yyyyMMdd', currentData);
          this.intervalText = Utils.TimeUtils.dateFormat('dd.MM.yyyy', currentData);

          TYSdk.apiRequest(
            (a = 'tuya.m.dp.rang.stat.hour.list'),
            (postData = {
              devId,
              dpId: this.state.dp,
              date: timeForDrowing,
              auto: 1,
              type: 'avg',
            }),
            (v = '1.0')
          )
            .then(d => {
              const data = Utils.JsonUtils.parseJSON(d);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        } else if (this.periodSelect === 1) {
          if (interval > 1) {
            currentData.setMonth(currentData.getMonth() - interval);
          }
          const monthAgoTemp = this.state.dateStart;
          const timeForDrowing = Utils.TimeUtils.dateFormat('yyyyMMdd', currentData);
          this.state.ini ? monthAgoTemp.setMonth(currentData.getMonth() - 1) : null;
          // monthAgoTemp.setMonth(currentData.getMonth() - 1);
          const monthAgo = Utils.TimeUtils.dateFormat('yyyyMMdd', monthAgoTemp);
          monthAgoTemp.setDate(monthAgoTemp.getDate());
          // eslint-disable-next-line max-len
          // this.intervalText = `${Strings.getLang('strFrom')} ${Utils.TimeUtils.dateFormat('dd.MM.yyyy', monthAgoTemp)} ${Strings.getLang('strTo')} ${Utils.TimeUtils.dateFormat('dd.MM.yyyy', currentData)}`;
          this.intervalText = `${Utils.TimeUtils.dateFormat('dd.MM.yyyy', monthAgoTemp)} - ${Utils.TimeUtils.dateFormat('dd.MM.yyyy', currentData)}`;

          const startDay = this.state.dateStart === new Date() ? monthAgo : Utils.TimeUtils.dateFormat('yyyyMMdd', this.state.dateStart);
          const endDay = this.state.dateStart === new Date() ? timeForDrowing : Utils.TimeUtils.dateFormat('yyyyMMdd', this.state.dateEnd);
          TYSdk.apiRequest(
            (a = 'tuya.m.dp.rang.stat.day.list'),
            (postData = {
              devId,
              dpId: this.state.dp,
              // startDay: monthAgo,
              // endDay: timeForDrowing,
              startDay,
              endDay,
              auto: 1,
              type: 'avg',
            }),
            (v = '1.0')
          )
            .then(d => {
              const data = Utils.JsonUtils.parseJSON(d);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        } else if (this.periodSelect === 2) {
          // for current year
          TYSdk.apiRequest(
            (a = 'tuya.m.dp.stat.month.list'),
            (postData = {
              devId,
              dpId: this.state.dp,
              type: 'avg',
            }),
            (v = '1.0')
          )
            .then(d => {
              const data = Utils.JsonUtils.parseJSON(d);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        }
      });
    });
  };

  getLogs = debounce(() => {
    this.getLog(this.interval).then(
      d => {
        let xLable = [];
        let valuesNum = [];
        if (d === undefined || d.totalCount === 0) {
          TYSdk.native.hideLoading();
          return this.setState({ dataVictory: [] });
        }
        TYSdk.native.hideLoading();
        
        if (this.periodSelect === 0) { // for day
          const keys = Object.keys(d);
          xLable = keys.map(string => parseInt(string, 10));
          const values = Object.values(d);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 10;
            }
          }
          xLable.shift();
          valuesNum.shift();
        } else if (this.periodSelect === 1) { // for month
          const keys = Object.keys(d.result);
          xLable = keys.map(string => `${string.substr(6, 7)}.${string.substring(4, 6)}.${string.substring(2, 4)}`);
          const values = Object.values(d.result);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 10;
            }
          }
          xLable.shift();
          valuesNum.shift();
        } else if (this.periodSelect === 2) { // for year
          const temDate = new Date();
          temDate.setFullYear(temDate.getFullYear() - this.interval);
          const year = Utils.TimeUtils.dateFormat('yyyy', temDate);
          this.intervalText = year;
          const keys = Object.keys(d.years[year]);
          xLable = keys.map(string => string);
          const values = Object.values(d.years[year]);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 10;
            }
          }
        }

        const dataLog = {
          labels: xLable,
          datasets: [
            {
              data: valuesNum,
            },
          ],
        };
        const victoryData = [];
        for (let i = 0; i < xLable.length; i++) {
          victoryData[i] = {
            x: xLable[i], y: valuesNum[i],
          };
        };

        const maxY = Math.max.apply(null, (victoryData.map(item => item.y)));
        const maxX = victoryData.length;
        console.log('dataLog', dataLog, dataLog.labels.length);
        console.log('victoryData', victoryData, victoryData.length);

        // this.setState({ dataVictory: this.periodSelect === 2 ? victoryData.slice(1) : this.periodSelect === 1 ? victoryData.splice(0, victoryData.length - 1) : victoryData, maxY, maxX }, () => {
        //   this.setState({ startRender: true }, () => {
        //     this.forceUpdate();
        //   });
        // });
        this.setState({ dataVictory: victoryData, maxY, maxX }, () => {
          this.setState({ startRender: true }, () => {
            this.forceUpdate();
          });
        });
      },
      e => {
        console.log(e, 'Error');
        TYSdk.native.hideLoading();
        const err = typeof e === 'string' ? JSON.parse(e) : e;
        const _err = err.message || err.errorMsg || err;
        Dialog.alert({
          title: _err,
          confirmText: Strings.getLang('strOk'),
        });
      }
    );
    this.forceUpdate();
  }, 500);

  getLog2 = interval => {
    return new Promise((resolve, reject) => {
      TYSdk.device.getDeviceInfo().then(res => {
        const { devId } = res;
        const currentData = this.state.dateEnd;
        if (this.periodSelect === 0) {
          // for curent day
          if (interval > 0) {
            currentData.setDate(currentData.getDate() - interval);
          }
          const timeForDrowing = Utils.TimeUtils.dateFormat('yyyyMMdd', currentData);
          this.intervalText = Utils.TimeUtils.dateFormat('dd.MM.yyyy', currentData);

          TYSdk.apiRequest(
            (a = 'tuya.m.dp.rang.stat.hour.list'),
            (postData = {
              devId,
              dpId: this.state.dp + 1,
              date: timeForDrowing,
              auto: 1,
              type: 'avg',
            }),
            (v = '1.0')
          )
            .then(d => {
              const data = Utils.JsonUtils.parseJSON(d);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        } else if (this.periodSelect === 1) {
          if (interval > 1) {
            currentData.setMonth(currentData.getMonth() - interval);
          }
          const monthAgoTemp = this.state.dateStart;
          const timeForDrowing = Utils.TimeUtils.dateFormat('yyyyMMdd', currentData);
          this.state.ini ? monthAgoTemp.setMonth(currentData.getMonth() - 1) : null;
          // monthAgoTemp.setMonth(currentData.getMonth() - 1);
          const monthAgo = Utils.TimeUtils.dateFormat('yyyyMMdd', monthAgoTemp);
          monthAgoTemp.setDate(monthAgoTemp.getDate());
          // eslint-disable-next-line max-len
          // this.intervalText = `${Strings.getLang('strFrom')} ${Utils.TimeUtils.dateFormat('dd.MM.yyyy', monthAgoTemp)} ${Strings.getLang('strTo')} ${Utils.TimeUtils.dateFormat('dd.MM.yyyy', currentData)}`;
          this.intervalText = `${Utils.TimeUtils.dateFormat('dd.MM.yyyy', monthAgoTemp)} - ${Utils.TimeUtils.dateFormat('dd.MM.yyyy', currentData)}`;

          const startDay = this.state.dateStart === new Date() ? monthAgo : Utils.TimeUtils.dateFormat('yyyyMMdd', this.state.dateStart);
          const endDay = this.state.dateStart === new Date() ? timeForDrowing : Utils.TimeUtils.dateFormat('yyyyMMdd', this.state.dateEnd);
          TYSdk.apiRequest(
            (a = 'tuya.m.dp.rang.stat.day.list'),
            (postData = {
              devId,
              dpId: this.state.dp + 1,
              // startDay: monthAgo,
              // endDay: timeForDrowing,
              startDay,
              endDay,
              auto: 1,
              type: 'avg',
            }),
            (v = '1.0')
          )
            .then(d => {
              const data = Utils.JsonUtils.parseJSON(d);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        } else if (this.periodSelect === 2) {
          // for current year
          TYSdk.apiRequest(
            (a = 'tuya.m.dp.stat.month.list'),
            (postData = {
              devId,
              dpId: this.state.dp + 1,
              type: 'avg',
            }),
            (v = '1.0')
          )
            .then(d => {
              const data = Utils.JsonUtils.parseJSON(d);
              resolve(data);
            })
            .catch(error => {
              reject(error);
            });
        }
      });
    });
  };

  getLogs2 = debounce(() => {
    this.getLog2(this.interval).then(
      d => {
        let xLable = [];
        let valuesNum = [];
        if (d === undefined || d.totalCount === 0) {
          TYSdk.native.hideLoading();
          return this.setState({ dataVictory: [] });
        }
        TYSdk.native.hideLoading();
        
        if (this.periodSelect === 0) { // for day
          const keys = Object.keys(d);
          xLable = keys.map(string => parseInt(string, 10));
          const values = Object.values(d);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 10;
            }
          }
          xLable.shift();
          valuesNum.shift();
        } else if (this.periodSelect === 1) { // for month
          const keys = Object.keys(d.result);
          xLable = keys.map(string => `${string.substr(6, 7)}.${string.substring(4, 6)}.${string.substring(2, 4)}`);
          const values = Object.values(d.result);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 10;
            }
          }
          xLable.shift();
          valuesNum.shift();
        } else if (this.periodSelect === 2) { // for year
          const temDate = new Date();
          temDate.setFullYear(temDate.getFullYear() - this.interval);
          const year = Utils.TimeUtils.dateFormat('yyyy', temDate);
          this.intervalText = year;
          const keys = Object.keys(d.years[year]);
          xLable = keys.map(string => string);
          const values = Object.values(d.years[year]);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 10;
            }
          }
        }

        const dataLog = {
          labels: xLable,
          datasets: [
            {
              data: valuesNum,
            },
          ],
        };
        const victoryData = [];
        for (let i = 0; i < xLable.length; i++) {
          victoryData[i] = {
            x: xLable[i], y: valuesNum[i],
          };
        };

        const maxY2 = Math.max.apply(null, (victoryData.map(item => item.y)));
        const maxX2 = victoryData.length;
        console.log('dataLog2', dataLog, dataLog.labels.length);
        console.log('victoryData2', victoryData, victoryData.length);

        this.setState({ dataVictory2: this.periodSelect === 2 ? victoryData.slice(1) : this.periodSelect === 1 ? victoryData.splice(0, victoryData.length - 1) : victoryData, maxY2, maxX2 }, () => {
          this.setState({ startRender: true }, () => {
            this.forceUpdate();
          });
        });
      },
      e => {
        console.log(e, 'Error');
        TYSdk.native.hideLoading();
        const err = typeof e === 'string' ? JSON.parse(e) : e;
        const _err = err.message || err.errorMsg || err;
        Dialog.alert({
          title: _err,
          confirmText: Strings.getLang('strOk'),
        });
      }
    );
    this.forceUpdate();
  }, 500);

  render() {
    const { ClimateSelector, chSelector } = this.props;
    const maxY = Math.max.apply(null, [this.state.maxY + 1, this.state.maxY2 + 1]);
    const maxX = this.state.maxX || this.state.maxX2;
    const Zopa = this.state.zone;

    const Item = ({ id, x, y }) => (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 7, marginBottom: 5, marginHorizontal: 20, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <FontAwesomeIcon icon={faCalendarAlt} color="#999" size={20} marginRight={8} />
          <TYText>{this.periodSelect === 0 ? `${x < 10 ? `0${x}:00` : `${x}:00`}` : x}</TYText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <FontAwesomeIcon icon={faWeight} color="#999" size={20} marginRight={8} />
          <TYText>{`${y} ${Strings.getLang('kwh')}`}</TYText>
        </View>
      </View>
    );
    const renderItem = ({ item }) => (
      item.y > 0 ?
        <View>
          <Divider />
          <Item id={item.id} x={item.x} y={item.y} />
          <Divider />
        </View> : null
    );

    return (
      <SafeAreaView style={[{ backgroundColor: '#fff', marginBottom: 5, flex: 1 }]}>
        <View style={[styles.container, { backgroundColor: '#FFF', borderBottomStartRadius: 20, borderBottomEndRadius: 20, marginBottom: 10 }]}>
          <View style={[styles.buttonGgroup]}>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={
                () => {
                  this.setState({ isChart: false });
                }
              }
            >
              <View
                style={[styles.buttonView1, { flexDirection: 'row' }]}
              >
                <FontAwesomeIcon icon={faBars} color="#999" size={16} marginLeft={8} marginRight={8} alignSelf="center" />
                <TYText style={[styles.textButton, { color: !this.state.isChart && ClimateSelector ? '#57BCFB' : !this.state.isChart && ClimateSelector === false ? '#ffb700' : '#333'}]}>{Strings.getLang('detailed')}</TYText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touch}
              activeOpacity={0.8}
              onPress={
                () => {
                  this.setState({ isChart: true });
                }
              }
            >
              <View style={[styles.buttonView3, { flexDirection: 'row' }]}>
                <FontAwesomeIcon icon={isIos ? faChartLine : faChartBar} color="#999" size={16} marginLeft={8} marginRight={8} alignSelf="center" />
                <TYText style={[styles.textButton, {color: this.state.isChart && ClimateSelector ? '#57BCFB' : this.state.isChart ? '#ffb700' : '#333'}]}>{Strings.getLang('charrr')}</TYText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touch}
              activeOpacity={0.8}
              onPress={() => {
                this.setState({ ini: false });
                Popup.custom({
                  content: (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                      }}
                    >
                      <TYText>{Strings.getLang('startPer')}</TYText>
                      <DatePicker
                        defaultDate={this.state.dateStart}
                        onDateChange={date => this.setState({ dateStart: new Date(date) })}
                        style={styles.datePickerStyle}
                        itemStyle={styles.pickerItem}
                        pickerFontColor={ClimateSelector ? '#57BCFB' : '#ffb700'}
                        dateSortKeys={['day', 'month', 'year']}
                        // mode={this.periodSelect === 1 ? 'date' : 'year'}
                        mode="date"
                      />
                      <TYText>{Strings.getLang('endPer')}</TYText>
                      <DatePicker
                        defaultDate={this.state.dateEnd}
                        onDateChange={date => this.setState({ dateEnd: new Date(date) })}
                        style={styles.datePickerStyle}
                        itemStyle={styles.pickerItem}
                        pickerFontColor={ClimateSelector ? '#57BCFB' : '#ffb700'}
                        dateSortKeys={['day', 'month', 'year']}
                        // mode={this.periodSelect === 1 ? 'date' : 'year'}
                        mode="date"
                      />
                    </View>
                  ),
                  title: Strings.getLang('per'),
                  cancelText: Strings.getLang('cancelText'),
                  confirmText: Strings.getLang('confirmText'),
                  onMaskPress: ({ close }) => {
                    close();
                  },
                  onConfirm: (date, { close }) => {
                    this.setState({ startRender: false }, () => {
                      const DEP = Math.floor((this.state.dateEnd.getTime() - this.state.dateStart.getTime()) / (1000 * 60 * 60 * 24));
                      DEP > 360 
                        ? this.onChangePeriodYear()
                        : DEP === 0
                          ? this.onChangePeriodDay()
                          : DEP < 0 || this.state.dateEnd > new Date()
                            ? TYNative.simpleTipDialog(`${Strings.getLang('IntErr')}`, () => {})
                            : this.onChangePeriodMonth();
                    // TYSdk.native.showLoading({ title: Strings.getLang('load') });
                    // this.litrEnable = true;
                    // this.getLogs();
                    });
                    // this.forceUpdate();
                    Popup.close();
                  },
                });
              }}
            >
              <View style={[styles.buttonView3, { flexDirection: 'row' }]}>
                <FontAwesomeIcon icon={faCalendarAlt} color="#999" size={18} marginLeft={8} marginRight={5} alignSelf="center" />
                <TYText style={[styles.textButton, { alignSelf: 'center'}]}>{Strings.getLang('intervala')}</TYText>
              </View>
            </TouchableOpacity>
            <LoadCapacity style={styles.touch} />
          </View>
          <Divider style={{ marginBottom: 25 }} />
          {this.state.isChart ? (
            <TYText style={[styles.textButtonStep, { alignSelf: 'center'}]}>{this.intervalText}</TYText>
          ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginRight: 8, marginLeft: 8 }}>
              <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ zone: !Zopa })}>
                <FontAwesomeIcon icon={faExchangeAlt} color="#999" size={16} marginLeft={8} marginRight={8} alignSelf="center" />
                {/* <TYText style={[styles.textButtonStep, { alignSelf: 'center'}]}>
                  {ClimateSelector && chSelector === false ? Strings.getLang(this.state.zone ? 'пыщь1кли' : 'пыщь2кли') : ClimateSelector && chSelector === true ? Strings.getLang(this.state.zone ? 'пыщь2кли' : 'пыщь1кли') : Strings.getLang(this.state.zone ? 'пыщь1' : 'пыщь2')}
                </TYText> */}
                {ClimateSelector ?
                  <View style={{ flexDirection: 'row' }}>
                    <TYText style={[styles.textButtonStep, { alignSelf: 'center', marginRight: 8, color: Zopa && !chSelector ? '#57BCFB' : Zopa && chSelector ? '#ffb700' : '#999' }]}>{Strings.getLang(chSelector ? 'пыщь2кли' : 'пыщь1кли')}</TYText>
                    <TYText style={[styles.textButtonStep, { alignSelf: 'center', color: !Zopa && !chSelector ? '#ffb700' : !Zopa && chSelector ? '#57BCFB' : '#999'}]}>{Strings.getLang(chSelector ? 'пыщь1кли' : 'пыщь2кли')}</TYText>
                  </View> : 
                  <View style={{ flexDirection: 'row' }}>
                    <TYText style={[styles.textButtonStep, { alignSelf: 'center', marginRight: 8, color: Zopa ? '#ffb700' : '#999' }]}>{Strings.getLang('пыщь1')}</TYText>
                    <TYText style={[styles.textButtonStep, { alignSelf: 'center', color: !Zopa ? '#ff7300' : '#999'}]}>{Strings.getLang('пыщь2')}</TYText>
                  </View>}
              </TouchableOpacity>
              <TYText style={[styles.textButtonStep, { alignSelf: 'center'}]}>{this.intervalText}</TYText>
            </View>)}
        </View>
        {this.state.dataVictory === null || this.state.dataVictory.length < 1 ? (
          <View style={{ height: cy(550), alignSelf: 'center', alignContent: 'center', justifyContent: 'center'}}>
            <FontAwesomeIcon icon={faCalendarTimes} color={ClimateSelector ? '#57BCFB' : '#ffb700'} size={65} alignSelf="center" marginBottom={35} />
            <TYText style={[styles.textButton]}>{Strings.getLang('пыщьпыщь')}</TYText>
          </View>
        ) : 
          this.state.isChart === true && this.state.dataVictory !== [] ? (
            <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, height: '90%', width: Dimensions.get('window').width - 8}}>
              {isIos ? 
                <VictoryChart
                  maxDomain={{ y: maxY < 1 ? 10 : maxY, x: maxX < 1 ? 10 : maxX }}
                  theme={VictoryTheme.material}
                  style={{ background: { fill: '#fff' } }}
                  height={Dimensions.get('window').height - (Dimensions.get('window').height * 0.5)}
                  width={Dimensions.get('window').width}
                  backgroundComponent={<Background y={0} x={0} height={Dimensions.get('window').height} width={Dimensions.get('window').width} />}
                >
                  <VictoryLegend 
                    x={100}
                    y={10}
                    orientation="horizontal"
                    gutter={70}
                    data={
                      ClimateSelector === true ? 
                        [
                          { name: Strings.getLang('пыщь1кли'), symbol: { fill: '#57BCFB' } },
                          { name: Strings.getLang('пыщь2кли'), symbol: { fill: '#ffb700' } }
                        ] : [
                          { name: Strings.getLang('пыщь1'), symbol: { fill: '#ffb700' } },
                          { name: Strings.getLang('пыщь2'), symbol: { fill: '#ff7300' } }
                        ]
                    }
                  />
                  <VictoryLine
                    style={{
                      data: { 
                        stroke: ClimateSelector === true && chSelector === true ? '#ffb700' : ClimateSelector === true && chSelector === false ? '#57BCFB' : '#ffb700', 
                        fill: 'transparent',
                        strokeWidth: maxX < 90 ? 3 : 1, 
                        strokeLinecap: 'round'
                      },
                      parent: { border: '1px solid #fff'},
                    }}
                    animate={true}
                    interpolation="natural"
                    data={this.state.dataVictory}
                    x
                    labels={({ datum }) => datum.y < 1 || maxX > 20 ? null : datum.y}
                    labelComponent={<VictoryLabel dy={30} />}
                  />
                  <VictoryLine
                    style={{
                      data: { 
                        stroke: ClimateSelector === true && chSelector === true ? '#57BCFB' : ClimateSelector === true && chSelector === false ? '#ffb700' : '#ff7300', 
                        fill: 'transparent', 
                        strokeWidth: maxX < 90 ? 3 : 1, 
                        strokeLinecap: 'round'
                      },
                      parent: { border: '1px solid #fff'}
                    }}
                    animate={true}
                    interpolation="natural"
                    data={this.state.dataVictory2}
                    x
                    labels={({ datum }) => datum.y < 1 || maxX > 20 ? null : datum.y}
                    labelComponent={<VictoryLabel dy={30} />}
                  />
                </VictoryChart> :
                <VictoryChart
                  maxDomain={{ y: maxY < 1 ? 10 : maxY, x: maxX < 1 ? 10 : maxX }}
                  theme={VictoryTheme.material}
                  style={{ background: { fill: '#fff' } }}
                  height={Dimensions.get('window').height - (Dimensions.get('window').height * 0.5)}
                  width={Dimensions.get('window').width}
                  backgroundComponent={<Background y={0} x={0} height={Dimensions.get('window').height} width={Dimensions.get('window').width} />}
                >
                  <VictoryLegend 
                    x={100}
                    y={10}
                    orientation="horizontal"
                    gutter={70}
                    data={
                      ClimateSelector === true ? 
                        [
                          { name: Strings.getLang('пыщь1кли'), symbol: { fill: '#57BCFB' } },
                          { name: Strings.getLang('пыщь2кли'), symbol: { fill: '#ffb700' } }
                        ] : [
                          { name: Strings.getLang('пыщь1'), symbol: { fill: '#ffb700' } },
                          { name: Strings.getLang('пыщь2'), symbol: { fill: '#ff7300' } }
                        ]
                    }
                  />
                  <VictoryBar
                    style={{
                      data: { stroke: ClimateSelector === true && chSelector === true ? '#ffb700' : ClimateSelector === true && chSelector === false ? '#57BCFB' : '#ffb700', fill: 'transparent' },
                      parent: { border: '1px solid #fff'},
                    }}
                    barRatio={maxX / 50}
                    alignment="start"
                    animate={true}
                    data={this.state.dataVictory}
                    x
                    labels={({ datum }) => datum.y < 1 || maxX > 20 ? null : datum.y}
                    labelComponent={<VictoryLabel dy={-20} />}
                  />
                  <VictoryBar
                    style={{
                      data: { stroke: ClimateSelector === true && chSelector === true ? '#57BCFB' : ClimateSelector === true && chSelector === false ? '#ffb700' : '#ff7300', fill: 'transparent' },
                      parent: { border: '1px solid #fff'}
                    }}
                    barRatio={maxX / 50}
                    alignment="start"
                    animate={true}
                    data={this.state.dataVictory2}
                    x
                    labels={({ datum }) => datum.y < 1 || maxX > 20 ? null : datum.y}
                    labelComponent={<VictoryLabel dy={-20} />}
                  />
                </VictoryChart>}
              <TYText style={{ alignSelf: 'center', textAlign: 'center', color: '#666'}}>{Strings.getLang('chartLegend')}</TYText>
            </View>
          ) : (
            <FlatList
              data={Zopa ? this.state.dataVictory : this.state.dataVictory2}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          )}
      </SafeAreaView>
    );
  }
}

ChartView.propTypes = {
  ClimateSelector: PropTypes.bool,
  chSelector: PropTypes.bool,
};

ChartView.defaultProps = {
  ClimateSelector: false,
  chSelector: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingRight: cy(6),
    paddingBottom: cy(5),
    paddingLeft: cy(6),
    backgroundColor: '#F8F8F8',
  },
  buttonGgroup: {
    paddingTop: 1,
    height: cy(40),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  pickerItem: {
    fontFamily: 'System',
    fontSize: 18,
  },
  touch: {
  },
  buttonView1: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderTopStartRadius: 12,
    borderBottomStartRadius: 12,
  },
  buttonView3: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
  },
  textButton: {
    color: '#333',
    textAlignVertical: 'center',
  },
  textButtonStep: {
    // flex: 3,
    color: '#333',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default connect(({ dpState }) => ({
  settingsCounter: dpState[settingsCounterCode],
  ClimateSelector: dpState[ClimateSelectorCode],
  chSelector: dpState[chSelectorCode],
}))(ChartView);