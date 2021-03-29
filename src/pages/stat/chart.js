/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-bitwise */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import debounce from 'lodash/debounce';
import { Utils, TYSdk, Dialog } from 'tuya-panel-kit';

import {
  VictoryBar,
  VictoryLine,
  VictoryChart,
  VictoryZoomContainer,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';
// import { DefaultTransition } from 'tuya-panel-kit/@react-navigation/stack/TransitionConfigs/TransitionPresets';
import Strings from '../../i18n';
// import 'babel-polyfill';
// import { ScrollView } from 'react-native-gesture-handler';

const { convertY: cy } = Utils.RatioUtils;

export default class ChartView extends Component {
  static propTypes = {
    idCount: PropTypes.number,
  };

  static defaultProps = {
    idCount: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataVictory: [],
      startRender: false,
    };
    this.periodSelect = 0; // 0-day, 1-month, 2-year
    this.dpID = 141; // 137 + this.props.numCounter;
    this.litrEnable = true;
    this.offset = 0;
    this.lineOrBar = false; // if folse then line else bar
    this.intervalText = '';
    this.interval = 0;
    TYSdk.native.showLoading({ title: '' });
    this.getLogs();
  }

  onChangePeriodDay = () => {
    this.periodSelect = 0;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: '' });
      this.getLogs();
    });
    this.forceUpdate();
  };

  onChangePeriodMonth = () => {
    this.periodSelect = 1;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: '' });
      this.getLogs();
    });
    this.forceUpdate();
  };

  onChangePeriodYear = () => {
    this.periodSelect = 2;
    this.interval = 0;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: '' });
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
      TYSdk.native.showLoading({ title: '' });
      this.getLogs();
    });
    this.forceUpdate();
  };

  onChangeStepUp = () => {
    if (this.interval === 0) return;
    this.interval -= 1;
    this.litrEnable = true;
    this.setState({ startRender: false }, () => {
      TYSdk.native.showLoading({ title: '' });
      this.getLogs();
    });
    this.forceUpdate();
  };

  getLog = interval => {
    return new Promise((resolve, reject) => {
      TYSdk.device.getDeviceInfo().then(res => {
        const { devId } = res;
        const currentData = new Date();
        if (this.periodSelect === 0) {
          // for curent day
          if (interval > 0) {
            currentData.setDate(currentData.getDate() - interval);
          }
          const timeForDrowing = Utils.TimeUtils.dateFormat('yyyyMMdd', currentData);
          this.intervalText = Utils.TimeUtils.dateFormat('yyyy-MM-dd', currentData);

          TYSdk.apiRequest(
            (a = 'tuya.m.dp.rang.stat.hour.list'),
            (postData = {
              devId,
              dpId: this.props.idCount + 137,
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
          // for current month 
          if (interval > 0) {
            currentData.setMonth(currentData.getMonth() - interval);
          }
          console.log('Calculate date', currentData);
          const monthAgoTemp = new Date();
          const timeForDrowing = Utils.TimeUtils.dateFormat('yyyyMMdd', currentData);
          monthAgoTemp.setMonth(currentData.getMonth() - 1);
          console.log('monthAgoTemp', monthAgoTemp);
          const monthAgo = Utils.TimeUtils.dateFormat('yyyyMMdd', monthAgoTemp);
          monthAgoTemp.setDate(monthAgoTemp.getDate() + 1);
          // eslint-disable-next-line max-len
          this.intervalText = `${Strings.getLang('strFrom')} ${Utils.TimeUtils.dateFormat('yyyy-MM-dd', monthAgoTemp)} ${Strings.getLang('strTo')} ${Utils.TimeUtils.dateFormat('yyyy-MM-dd', currentData)}`;
          console.log('From', monthAgo);
          console.log('To', timeForDrowing);

          TYSdk.apiRequest(
            (a = 'tuya.m.dp.rang.stat.day.list'),
            (postData = {
              devId,
              dpId: this.props.idCount + 137,
              startDay: monthAgo,
              endDay: timeForDrowing,
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
              dpId: this.props.idCount + 137,
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
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          console.log('values befor', valuesNum);
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
          console.log('valuesTemp', valuesTemp);
          valuesNum = valuesTemp;
          if (!this.litrEnable) {
            for (let i = 0; i < valuesNum.length; i++) {
              valuesNum[i] /= 1000;
            }
          }
          xLable.shift();
          valuesNum.shift();
          console.log('values after', valuesNum);
        } else if (this.periodSelect === 1) { // for month
          const keys = Object.keys(d.result);
          xLable = keys.map(string => `${string.substr(6, 7)}.${string.substring(4, 6)}`);
          const values = Object.values(d.result);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          console.log('values befor', valuesNum);
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
          console.log('values after', valuesNum);
        } else if (this.periodSelect === 2) { // for year
          const temDate = new Date();
          temDate.setFullYear(temDate.getFullYear() - this.interval);
          console.log('Curren Year2', temDate);
          const year = Utils.TimeUtils.dateFormat('yyyy', temDate);
          this.intervalText = year;
          console.log('Curren Year3', year);
          const keys = Object.keys(d.years[year]);
          xLable = keys.map(string => string);
          const values = Object.values(d.years[year]);
          valuesNum = values.map(string => Math.trunc(parseInt(string, 10)));
          console.log('values befor', valuesNum);
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
          console.log('values after', valuesNum);
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

        this.setState({ dataVictory: victoryData }, () => {
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
    if (!this.state.startRender) {
      return <View style={styles.container} />;
    }
    let text = '';
    if (this.litrEnable) {
      text = `${Strings.getLang('strUnitsL')}`;
    } else {
      text = `${Strings.getLang('strUnitsM3')}\u00B3`;
    }

    return (
      <ScrollView style={[{ backgroundColor: '#F8F8F8' }]}>
        <View style={[styles.container, { backgroundColor: '#F8F8F8' }]}>
          <View style={[styles.buttonGgroup]}>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={this.onChangePeriodDay}
            >
              <View
                style={[
                  styles.buttonView1,
                  { backgroundColor: this.periodSelect === 0 ? '#ffaa42' : '#ddd' },
                ]}
              >
                <Text style={[styles.textButton]}>{Strings.getLang('strDay')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={this.onChangePeriodMonth}
            >
              <View
                style={[
                  styles.buttonView2,
                  { backgroundColor: this.periodSelect === 1 ? '#ffaa42' : '#ddd' },
                ]}
              >
                <Text style={[styles.textButton]}>{Strings.getLang('strMonth')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={this.onChangePeriodYear}
            >
              <View
                style={[
                  styles.buttonView3,
                  { backgroundColor: this.periodSelect === 2 ? '#ffaa42' : '#ddd' },
                ]}
              >
                <Text style={[styles.textButton]}>{Strings.getLang('strYear')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonGgroupChart]}>
            <TouchableOpacity
              style={[styles.touchChart]}
              activeOpacity={0.8}
              onPress={this.onChangeToBar}
            >
              <View
                style={[
                  styles.buttonView1,
                  { backgroundColor: !this.lineOrBar ? '#ffaa42' : '#ddd' },
                ]}
              >
                <Text style={[styles.textButton]}>{Strings.getLang('strBarChart')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={this.onChangeToLine}
            >
              <View
                style={[
                  styles.buttonView3,
                  { backgroundColor: this.lineOrBar ? '#ffaa42' : '#ddd' },
                ]}
              >
                <Text style={[styles.textButton]}>{Strings.getLang('strLineChart')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.container]}>
          <Text style={[styles.textChart]}>{text}</Text>
          {this.lineOrBar ? (
            <View style={[styles.containerChart]}>
              <VictoryChart
                padding={{ top: 20, bottom: 60, left: 60, right: 20 }}
                theme={VictoryTheme.material}
                containerComponent={<VictoryZoomContainer />}
                width={Dimensions.get('window').width}
                height={400}
                containerComponent={<VictoryZoomContainer
                  responsive={false}
                  zoomDimension="x"
                />}
              >
                <VictoryLine
                  style={{
                    data: { stroke: '#ffaa42' },
                    parent: { border: '1px solid #ccc' },
                    labels: { fill: '#F8F8F8' },
                  }}
                  data={this.state.dataVictory}
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel dy={- 15} />}
                />
              </VictoryChart>
            </View>
          ) : (
            <View style={styles.containerChart}>
              <VictoryChart
                padding={{ top: 20, bottom: 60, left: 60, right: 30 }}
                theme={VictoryTheme.material}
                domainPadding={10}
                containerComponent={<VictoryZoomContainer />}
                width={Dimensions.get('window').width}
                height={400}
                containerComponent={<VictoryZoomContainer
                  responsive={false}
                  zoomDimension="x"
                />}
              >
                <VictoryBar
                  // barRatio={0.3}
                  // barWidth={9}
                  style={{
                    data: { fill: '#ffaa42' },
                    parent: { border: '1px solid #ccc' },
                    labels: { fill: 'white' },
                  }}
                  data={this.state.dataVictory}
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel dy={- 15} />}
                />
              </VictoryChart>
            </View>
          )}

        </View>

        <View style={[styles.container, { backgroundColor: '#F8F8F8' }]}>
          <View style={[styles.buttonGgroupChart]}>
            <TouchableOpacity
              style={[styles.touchChart]}
              activeOpacity={0.8}
              onPress={this.onChangeStepDown}
            >
              <View
                style={[
                  styles.buttonStepDownView,
                  { backgroundColor: '#ffaa42' },
                ]}
              >
                <Text style={[styles.textButton]}>{'<'}</Text>
              </View>
            </TouchableOpacity>
            <Text style={[styles.textButtonStep]}>{this.intervalText}</Text>
            <TouchableOpacity
              style={[styles.touch]}
              activeOpacity={0.8}
              onPress={this.onChangeStepUp}
            >
              <View
                style={[
                  styles.buttonStepUpView,
                  { backgroundColor: '#ffaa42' }
                ]}
              >
                <Text style={[styles.textButton]}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingRight: cy(6),
    paddingTop: cy(5),
    paddingBottom: cy(5),
    paddingLeft: cy(6),
    alignSelf: 'stretch',
    alignItems: 'stretch',
    // backgroundColor: '#F8F8F8',
  },
  containerChart: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  buttonGgroup: {
    paddingTop: 10,
    paddingBottom: 10,
    height: cy(45),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    // backgroundColor: 'yellow', // '#F8F8F8',
  },
  buttonGgroupChart: {
    paddingTop: 10,
    paddingBottom: 10,
    // height: cy(60),
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    // backgroundColor: 'yellow', // '#F8F8F8',
  },
  touch: {
    flex: 1,
    width: '33%',
  },
  touchChart: {
    flex: 1,
    width: '50%',
  },
  buttonView1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderColor: 'gray',
    borderTopStartRadius: 14,
    borderBottomStartRadius: 14,
    borderRightWidth: 1,
  },
  buttonView2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderColor: 'gray',
    borderRightWidth: 1,
    // borderWidth: 1,
  },
  buttonView3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderColor: 'gray',
    borderTopEndRadius: 14,
    borderBottomEndRadius: 14,
    // borderRightWidth: 1,
    // borderWidth: 1,
  },
  buttonStepDownView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderColor: 'gray',
    borderTopStartRadius: 14,
    borderBottomStartRadius: 14,
    // borderRightWidth: 1,
  },
  buttonStepUpView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: cy(30),
    borderColor: 'gray',
    borderTopEndRadius: 14,
    borderBottomEndRadius: 14,
    // borderRightWidth: 1,
    // borderWidth: 1,
  },
  textButton: {
    color: '#333',
    fontSize: cy(16),
    textAlignVertical: 'center',
  },
  textChart: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: '#000000',
    color: '#F8F8F8',
    fontSize: cy(14),
    textAlignVertical: 'center',
  },
  textButtonStep: {
    flex: 3,
    color: '#333',
    fontSize: cy(16),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
