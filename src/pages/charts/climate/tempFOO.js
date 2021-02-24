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
  faTasks,
  faCog,
  faPowerOff,
  faStopwatch20,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;

const hrss = Strings.getLang('hrss');
const minss = Strings.getLang('minss');

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
      dutemps: _.range(-15, 81),
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
    const temps = part0.map(item => parseInt(item.substring(4, 6), 16));
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
    // const DATA = this.getdata();
    const monDATA = this.getdata().filter(item => item.day === 'mon');
    const tuyDATA = this.getdata().filter(item => item.day === 'tuy');
    const wedDATA = this.getdata().filter(item => item.day === 'wed');
    const thuDATA = this.getdata().filter(item => item.day === 'thu');
    const friDATA = this.getdata().filter(item => item.day === 'fri');
    const satDATA = this.getdata().filter(item => item.day === 'sat');
    const sunDATA = this.getdata().filter(item => item.day === 'sun');
    const Item = ({ title, subTitle }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        underlayColor="#90EE90"
        // eslint-disable-next-line no-alert
        // eslint-disable-next-line max-len
        onLongPress={() => {
          Popup.custom({
            content: (
              <View
                style={{
                  flexDirection: 'row',
                  height: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <FontAwesomeIcon icon={faThermometerHalf} color="#474747" size={25} />
                <Picker
                  style={styles.timerPicker}
                  itemStyle={styles.pickerItem}
                  selectedValue={title}
                  onValueChange={this._handleChange}
                >
                  {this.state.dutemps.map(stepperValue => (
                    <Picker.Item
                      key={stepperValue}
                      value={stepperValue}
                      label={String(`${stepperValue} °C`)}
                    />
                  ))}
                </Picker>
                <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={25} />
                <TimerPicker
                  style={styles.timerPicker}
                  title="Time period selection"
                  cancelText="Cancel"
                  confirmText="Confirm"
                  startTime={subTitle}
                  is12Hours={false}
                  singlePicker={true}
                  onTimerChange={this._handleTimerChange}
                />
                {/* <Stepper
                  buttonType="ellipse"
                  buttonStyle={{ size: 'small' }}
                  ellipseIconColor="#474747"
                  style={styles.stepper}
                  // inputStyle={{ color: 'transparent' }}
                  editable={true}
                  onValueChange={stepperValue => this.setState({ stepperValue })}
                  max={80}
                  stepValue={1}
                  min={-15}
                  value={title}
                /> */}
              </View>
            ),
            title: 'Custom',
            cancelText: 'Cancel',
            confirmText: 'Confirm',
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (date, { close }) => {
              Popup.close();
            },
          });
        }}
        // onLongPress={this.pointSetup}
        style={styles.item}
      >
        <View style={styles.inside}>
          <FontAwesomeIcon icon={faThermometerHalf} color="#474747" size={20} />
          <Text style={styles.title}>{title}°C</Text>
          <Divider style={styles.divider} />
          <FontAwesomeIcon icon={faBusinessTime} color="#474747" size={20} />
          <Text style={styles.title}>{this.convertMinsToTime(subTitle)}</Text>
        </View>
      </TouchableOpacity>
    );
    const renderItem = ({ item }) => <Item title={item.temperature} subTitle={item.time} />;

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
  // listItem: {
  //   height: 72,
  //   marginBottom: 8,
  //   backgroundColor: '#242831',
  // },
  container: {
    flex: 1,
  },
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
  stepper: {
    marginVertical: 8,
    marginHorizontal: 16,
    margin: 20,
  },
  timerPicker: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: 150,
    height: 150,
  },
  divider: {
    flexDirection: 'column',
    color: 'black',
    // width: 50,
    height: 20,
  },
  title: {
    // fontSize: 32,
    color: '#474747',
  },
  pickerContainer: {
    // height: 188,
    flex: 1,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tip: {
    fontSize: 15,
    color: 'black',
  },

  picker: {
    marginVertical: 0,
    height: 188,
    width: 100,
  },

  // subTitle: {
  //   color: 'rgba(255, 255, 255, 0.4)',
  //   marginTop: 4,
  // },
});

export default connect(({ dpState }) => ({
  chart_1_part_1: dpState[chart_1_part_1Code],
  chart_1_part_2: dpState[chart_1_part_2Code],
  chart_1_part_3: dpState[chart_1_part_3Code],
  chart_1_part_4: dpState[chart_1_part_4Code],
}))(ClimateProgramm);
