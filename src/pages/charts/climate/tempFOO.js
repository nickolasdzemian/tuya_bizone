/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { TYSdk, TYFlatList, Popup } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHandPointUp,
  faChartBar,
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
    this.state = { temp: this._getTemp(), time: this._getTime() };
  }

  getdata() {
    const temperature = this.state.temp;
    const time = this.state.time;
    const Data = [];
    if (this._getLenth() > 0) {
      for (let i = 0; i < this._getLenth(); i++) {
        Data[i] = {
          id: i,
          temperature: temperature[i],
          time: time[i],
        };
      }
    }
    console.log('chart for list', Data);
    return Data;
  }

  convertMinsToTime = mins => {
    const hours = Math.floor(mins / 60);
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

  render() {
    const DATA = this.getdata();
    const Item = ({ title, subTitle }) => (
      <TouchableOpacity
        activeOpacity={0.6}
        underlayColor="#90EE90"
        // eslint-disable-next-line no-alert
        // eslint-disable-next-line max-len
        onPress={() => alert(String(title.toString(10) + (this.convertMinsToTime(subTitle)).toString(10)))}
        style={styles.item}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{this.convertMinsToTime(subTitle)}</Text>
      </TouchableOpacity>
    );
    const renderItem = ({ item }) => <Item title={item.temperature} subTitle={item.time} />;

    return (
      <SafeAreaView style={styles.container}>
        <TYFlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      </SafeAreaView>
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
  },
  title: {
    // fontSize: 32,
    color: 'black',
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
