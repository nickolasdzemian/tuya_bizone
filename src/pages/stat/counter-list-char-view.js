/* eslint-disable react/static-property-placement */
/* eslint-disable no-bitwise */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { decode } from '../../utils/base-64';
import dpCodes from '../../config/dpCodes.ts';
import CounterViewRowChart from '../../components/counters-view-row-chart';

const { convertY: cy } = Utils.RatioUtils;

const { settingsCounter: settingsCounterCode, nemeCounters: nemeCountersCode } = dpCodes;

class CounterChartsList extends Component {
  static propTypes = {
    settingsCounter: PropTypes.string,
    nemeCounters: PropTypes.string,
  };

  static defaultProps = {
    settingsCounter:
      // eslint-disable-next-line max-len
      '01001100010a000001000000020a000001000000030a000001000000040a000001000000050a000001000000060a000001000000070a000001000000080a0000',
    nemeCounters: 'Counter1,Counter2,Counter3,Counter4,Counter5,Counter6,Counter7,Counter8',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getData = () => {
    const { settingsCounter, nemeCounters } = this.props;
    const Data = [];
    let CountersData = [];
    CountersData = decode(settingsCounter);
    const nameOfCounters = nemeCounters.split(',');
    let j = 0;
    for (let i = 0; i < 8; i++) {
      if (CountersData[i * 8 + 5]) {
        Data[j] = {
          // eslint-disable-next-line no-bitwise
          idCount: j,
          num: i,
          value:
            (CountersData[i * 8 + 1] << 24) |
            (CountersData[i * 8 + 2] << 16) |
            (CountersData[i * 8 + 3] << 8) |
            CountersData[i * 8 + 4],
          // eslint-disable-next-line no-unneeded-ternary
          attention: CountersData[i * 8 + 7] ? true : false,
          name: nameOfCounters[i],
        };
        j++;
      }
    }
    return Data;
  };

  render() {
    let Counters = {};
    Counters = this.getData();
    const renderItem = ({ item }) => (
      <CounterViewRowChart
        idCount={item.idCount}
        num={item.num}
        value={item.value}
        name={item.name}
        attention={item.attention}
      />
    );
    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <ScrollView>
          <FlatList data={Counters} renderItem={renderItem} keyExtractor={item => item.name} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: cy(6),
    paddingTop: cy(5),
    paddingLeft: cy(6),
    alignSelf: 'stretch',
  },
});

export default connect(({ dpState }) => ({
  settingsCounter: dpState[settingsCounterCode],
  nemeCounters: dpState[nemeCountersCode],
}))(CounterChartsList);
