/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { TYSdk, TYFlatList, Popup } from 'tuya-panel-kit';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYNative = TYSdk.native;
const TYDevice = TYSdk.device;

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
  get data() {
    return new Array(this._getLenth()).fill(0).map((temps, idx) => ({
      key: idx,
      styles: idx === 2 && {
        container: styles.listItem,
        title: styles.title,
        subTitle: styles.subTitle,
      },
      title: `title_${temps}`,
      subTitle: `subTitle_${idx}`,
      arrow: true,
      iconSize: 24,
      Icon: idx === 0 ? '1' : Res.hue,
      onPress: this._getFull(),
    }));
  }

  _getLenth() {
    const Ipart = parseInt(this.props.chart_1_part_1.substring(0, 4), 16);
    const IIpart = parseInt(this.props.chart_1_part_2.substring(0, 4), 16);
    const IIIpart = parseInt(this.props.chart_1_part_3.substring(0, 4), 16);
    const IVpart = parseInt(this.props.chart_1_part_4.substring(0, 4), 16);
    const LENA = Ipart + IIpart + IIIpart + IVpart;
    console.log(LENA);
    return LENA;
  }

  _getFull() {
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
    const temps = part0.map(item => parseInt(item.substring(4, 6), 16));
    console.log(times, 'ВРЕМЯ ЕБАТЬ', temps, 'ТЕМПЕРАТУРА ЕБАТЬ');
    return temps;
  }

  _handleItemPress = value => () => {
    TYNative.simpleTipDialog(`Click Item ${value}`, () => {});
  };

  render() {
    return (
      <TYFlatList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={{ paddingTop: 16 }}
        data={this.data}
      />
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
  listItem: {
    height: 72,
    marginBottom: 8,
    backgroundColor: '#242831',
  },

  title: {
    color: 'rgba(255, 255, 255, 0.9)',
  },

  subTitle: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 4,
  },
});

export default connect(({ dpState }) => ({
  chart_1_part_1: dpState[chart_1_part_1Code],
  chart_1_part_2: dpState[chart_1_part_2Code],
  chart_1_part_3: dpState[chart_1_part_3Code],
  chart_1_part_4: dpState[chart_1_part_4Code],
}))(ClimateProgramm);
