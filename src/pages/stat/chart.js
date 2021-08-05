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
import { faCalendarTimes, faCalendarAlt, faWeight, faExchangeAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from 'react-native-chart-kit';
import { decode } from '../../utils/base-64';
import dpCodes from '../../config/dpCodes.ts';
// import { DefaultTransition } from 'tuya-panel-kit/@react-navigation/stack/TransitionConfigs/TransitionPresets';
import Strings from '../../i18n';
// import 'babel-polyfill';
// import { ScrollView } from 'react-native-gesture-handler';

const { RelayPower1: RelayPower1Code, RelayPower2: RelayPower2Code } = dpCodes;
const { convertY: cy } = Utils.RatioUtils;
const TYNative = TYSdk.native;

class ChartView extends Component {
  static propTypes = {
    idCount: PropTypes.number,
    settingsCounter: PropTypes.string,
  };

  static defaultProps = {
    idCount: 0,
    settingsCounter:
      // eslint-disable-next-line max-len
      '01001100010a000001000000020a000001000000030a000001000000040a000001000000050a000001000000060a000001000000070a000001000000080a0000',
  };

  constructor(props) {
    super(props);
    const Exact = this.getFullSettings();
    this.state = {
      dataVictory: [],
      startRender: false,
      dateStart: new Date(),
      dateEnd: new Date(),
      ini: true,
      isChart: false,
      яблоко: (Math.floor(Exact[this.props.idCount].value)) / 1000,
    };
    this.periodSelect = 1; // 0-day, 1-month, 2-year
    this.dpID = 153; // 137 + this.props.numCounter;
    this.litrEnable = true;
    this.offset = 0;
    this.lineOrBar = false; // if folse then line else bar
    this.intervalText = '';
    this.interval = 0;
    this.apelle = 153;
    TYSdk.native.showLoading({ title: Strings.getLang('load') });
    this.getLogs();
  }

  onChangePeriodDay = () => {
    this.periodSelect = 0;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: Strings.getLang('load') });
      this.getLogs();
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
    });
    this.forceUpdate();
  };

  getFullSettings() {
    const { settingsCounter } = this.props;
    const data = [];
    let settingsCountersData = [];
    settingsCountersData = decode(settingsCounter);
    for (let i = 0; i < 8; i++) {
      data[i] = {
        num: i,
        value: settingsCountersData[i * 8 + 1] << 24 | settingsCountersData[i * 8 + 2] << 16 | settingsCountersData[i * 8 + 3] << 8 | settingsCountersData[i * 8 + 4],
      };
    }
    return data;
  }

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
              dpId: this.apelle,
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
              dpId: this.apelle,
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
              dpId: this.apelle,
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
          xLable = keys.map(string => parseInt(string, 10) % 100);
          const values = Object.values(d);
          valuesNum = values.map(string => string);
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1000)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 1000;
            }
          }
          xLable.shift();
          valuesNum.shift();
        } else if (this.periodSelect === 1) { // for month
          const keys = Object.keys(d.result);
          xLable = keys.map(string => this.state.isChart === false ? `${string.substr(6, 7)}.${string.substring(4, 6)}.${string.substring(2, 4)}` : `${string.substr(6, 7)}`);
          const values = Object.values(d.result);
          valuesNum = values.map(string => string, 10);
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1000)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 1000;
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
          valuesNum = values.map(string => string, 10);
          const valuesTemp = [];
          for (let i = 0; i < valuesNum.length; i++) {
            if (i === 0) {
              valuesTemp[i] = valuesNum[i];
            } else if (valuesNum[i] >= valuesNum[i - 1]) {
              valuesTemp[i] = valuesNum[i] - valuesNum[i - 1];
            } else {
              valuesTemp[i] = valuesNum[i];
            }
            if ((i !== 0) && (valuesTemp[i] >= 1000)) {
              this.litrEnable = false;
            }
          }
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 1000;
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
        console.log('dataLog', dataLog, dataLog.labels.length);
        console.log('victoryData', victoryData, victoryData.length);

        this.setState({ dataVictory: this.periodSelect === 2 ? victoryData.slice(1) : this.periodSelect === 1 ? victoryData.splice(0, victoryData.length - 1) : victoryData }, () => {
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
    const I = this.periodSelect;

    const Item = ({ id, x, y }) => (
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 7, marginBottom: 5, marginHorizontal: 20, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <FontAwesomeIcon icon={faCalendarAlt} color="#2f90d4" size={20} marginRight={8} />
          <TYText>{this.periodSelect === 0 ? `${x < 10 ? `0${x}:00` : `${x}:00`}` : x}</TYText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <FontAwesomeIcon icon={faWeight} color="#2f90d4" size={20} marginRight={8} />
          <TYText>{`${y === this.state.яблоко ? '0' : y} m\u00B3`}</TYText>
        </View>
      </View>
    );
    const renderItem = ({ item }) => (
      <Item id={item.id} x={item.x} y={item.y} />
    );

    return (
      <SafeAreaView style={[{ backgroundColor: '#f0f0f0', marginBottom: 5, flex: 1 }]}>
        <View style={[styles.container, { backgroundColor: '#FFF', borderBottomStartRadius: 20, borderBottomEndRadius: 20, marginBottom: 10 }]}>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between', height: cy(38), borderColor: '#2f90d4', borderRadius: 16, borderWidth: 0.7 }}
            activeOpacity={0.7}
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
                      pickerFontColor="#2f90d4"
                      dateSortKeys={['day', 'month', 'year']}
                      // mode={this.periodSelect === 1 ? 'date' : 'year'}
                      mode="date"
                    />
                    <TYText>{Strings.getLang('endPer')}</TYText>
                    <DatePicker
                      defaultDate={this.state.dateEnd}
                      onDateChange={date => this.setState({ dateEnd: new Date(date) })}
                      style={styles.datePickerStyle}
                      pickerFontColor="#2f90d4"
                      dateSortKeys={['day', 'month', 'year']}
                      // mode={this.periodSelect === 1 ? 'date' : 'year'}
                      mode="date"
                    />
                  </View>
                ),
                title: Strings.getLang('per'),
                cancelText: Strings.getLang('strCancel'),
                confirmText: 'OK',
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
            <FontAwesomeIcon icon={faExchangeAlt} color="#2f90d4" size={22} marginLeft={12} marginRight={8} alignSelf="center" />
            <TYText style={[styles.textButtonStep, { alignSelf: 'center'}]}>{this.intervalText}</TYText>
            <FontAwesomeIcon icon={faPen} color="#999" size={19} marginLeft={8} marginRight={12} alignSelf="center" />
          </TouchableOpacity>

          <View style={[styles.buttonGgroup]}>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={
                () => {
                  this.interval = 0;
                  this.litrEnable = true;
                  this.apelle = 153;
                  this.setState({ isChart: false, startRender: false}, () => {
                    TYSdk.native.showLoading({ title: Strings.getLang('load') });
                    this.getLogs();
                  });
                  this.forceUpdate();
                }
              }
            >
              <View
                style={[
                  styles.buttonView1,
                  { backgroundColor: this.state.isChart ? '#ddd' : '#2f90d4' },
                ]}
              >
                <TYText style={[styles.textButton]}>{Strings.getLang('пыщь1')}</TYText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={
                () => {
                  this.interval = 0;
                  this.litrEnable = true;
                  this.apelle = 154;
                  this.setState({ isChart: true, startRender: false}, () => {
                    TYSdk.native.showLoading({ title: Strings.getLang('load') });
                    this.getLogs();
                  });
                  this.forceUpdate();
                }
              }
            >
              <View
                style={[
                  styles.buttonView3,
                  { backgroundColor: this.state.isChart ? '#2f90d4' : '#ddd' },
                ]}
              >
                <TYText style={[styles.textButton]}>{Strings.getLang('пыщь2')}</TYText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.dataVictory === null || this.state.dataVictory.length < 1 ? (
          <View style={{ height: cy(550), alignSelf: 'center', alignContent: 'center', justifyContent: 'center'}}>
            <FontAwesomeIcon icon={faCalendarTimes} color="#2f90d4" size={65} alignSelf="center" marginBottom={35} />
            <TYText style={[styles.textButton]}>{Strings.getLang('пыщьпыщь')}</TYText>
          </View>
        ) : 
          this.state.isChart === true && this.state.startRender === true && this.state.dataVictory !== [] ? (
            <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, height: Dimensions.get('window').height - 220, width: Dimensions.get('window').width - 8}}>
              <BarChart
                data={{
                  labels: this.state.dataVictory.map(item => this.state.dataVictory.length < 20 ? item.x : ''),
                  datasets: [
                    {
                      data: this.state.dataVictory.map(item => item.y < 1 ? null : item.y === this.state.яблоко ? '0' : I === 2 ? item.y : item.y)
                    }
                  ]
                }}
                width={Dimensions.get('window').width - 10} // from react-native
                height={Dimensions.get('window').height - 300}
                // yAxisLabel="$"
                yAxisSuffix={Strings.getLang('strUnits')}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                // backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  barPercentage: this.state.dataVictory.length < 20 ? 0.5 : 0.1,
                  color: (opacity = 1) => `rgba(47, 144, 212, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
                  propsForDots: {
                    r: '4',
                    stroke: '#2f90d4'
                  }
                }}
                withVerticalLines={false}
                withHorizontalLines={false}
                withInnerLines={false}
                showValuesOnTopOfBars={this.state.dataVictory.length < 20}
                zoom={false}
                style={{
                  marginTop: 20,
                  marginRight: 8,
                  borderRadius: 16
                }}
              />
              <TYText style={{ alignSelf: 'center', textAlign: 'center', color: '#666'}}>{Strings.getLang('chartLegend')}</TYText>
            </View>
          ) : (
            <View style={{alignSelf: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, height: Dimensions.get('window').height - 220, width: Dimensions.get('window').width - 8}}>
              <BarChart
                data={{
                  labels: this.state.dataVictory.map(item => this.state.dataVictory.length < 20 ? item.x : ''),
                  datasets: [
                    {
                      data: this.state.dataVictory.map(item => item.y < 1 ? null : item.y === this.state.яблоко ? '0' : I === 2 ? item.y : item.y)
                    }
                  ]
                }}
                width={Dimensions.get('window').width - 10} // from react-native
                height={Dimensions.get('window').height - 300}
                // yAxisLabel="$"
                yAxisSuffix={Strings.getLang('strUnits')}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                // backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  barPercentage: this.state.dataVictory.length < 20 ? 0.5 : 0.1,
                  color: (opacity = 1) => `rgba(47, 144, 212, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
                  propsForDots: {
                    r: '4',
                    stroke: '#2f90d4'
                  }
                }}
                withVerticalLines={false}
                withHorizontalLines={false}
                withInnerLines={false}
                showValuesOnTopOfBars={this.state.dataVictory.length < 20}
                zoom={false}
                style={{
                  marginTop: 20,
                  marginRight: 8,
                  borderRadius: 16
                }}
              />
              <TYText style={{ alignSelf: 'center', textAlign: 'center', color: '#666'}}>{Strings.getLang('chartLegend')}</TYText>
            </View>
          )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingRight: cy(6),
    paddingBottom: cy(5),
    paddingLeft: cy(6),
    backgroundColor: '#F8F8F8',
  },
  buttonGgroup: {
    paddingTop: 10,
    // paddingBottom: 10,
    height: cy(50),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  touch: {
    flex: 1,
    width: '50%',
    margin: 1,
  },
  buttonView1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderTopStartRadius: 12,
    borderBottomStartRadius: 12,
  },
  buttonView3: {
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
  },
  textButton: {
    color: '#333',
    fontSize: cy(14),
    textAlignVertical: 'center',
  },
  textButtonStep: {
    // flex: 3,
    color: '#333',
    fontSize: cy(14),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default connect(({ dpState }) => ({
  RelayPower1: dpState[RelayPower1Code],
  RelayPower2: dpState[RelayPower2Code],
}))(ChartView);
