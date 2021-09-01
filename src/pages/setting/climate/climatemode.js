// выбор датчиков для климат-режима
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Popup, TYSdk, TYText, Dialog } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faListOl, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const { SensorSet3: SensorSet3Code } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const climatemode = Strings.getLang('climatemode');

// определение массива с режимами
const set = [
  {
    key: 'air',
    title: Strings.getLang('air'),
    value: '1',
  },
  {
    key: 'flour_1',
    title: Strings.getLang('flour_1'),
    value: '2',
  },
  {
    key: 'flour_2',
    title: Strings.getLang('flour_2'),
    value: '3',
  },
];

class ClimateMode extends Component {
  getDataSensors() {
    const { SensorSet3 } = this.props;
    const nowSet =
      SensorSet3 === 'air'
        ? ['1']
        : SensorSet3 === 'flour_1'
          ? ['2']
          : SensorSet3 === 'flour_2'
            ? ['3']
            : SensorSet3 === 'flour_12'
              ? ['2', '3']
              : SensorSet3 === 'air_flour_1'
                ? ['1', '2']
                : SensorSet3 === 'air_flour_2'
                  ? ['1', '3']
                  : SensorSet3 === 'air_flour_12'
                    ? ['1', '2', '3']
                    : ['0'];
    return nowSet;
  }

  sendDataSensors(value, { close }) {
    const prepare0 = value.map(item => parseInt(item, 16));
    prepare0.sort(function(a, b) {
      return a - b;
    });
    const prepare = prepare0.toString();
    const send =
      prepare === '1'
        ? 'air'
        : prepare === '2'
          ? 'flour_1'
          : prepare === '3'
            ? 'flour_2'
            : prepare === '2,3'
              ? 'flour_12'
              : prepare === '1,2'
                ? 'air_flour_1'
                : prepare === '1,3'
                  ? 'air_flour_2'
                  : prepare === '1,2,3'
                    ? 'air_flour_12'
                    : '0';
    if (send !== '0')
      TYDevice.putDeviceData({
        [SensorSet3Code]: send,
      }) && close();
    else Dialog.alert({
      title: '!',
      subTitle: Strings.getLang('selectControllingSens'),
      confirmText: 'OK',
      onConfirm: (data, { close }) => {
        close();
      },
    });
  }

  climatemode() {
    Popup.list({
      contentCenter: false,
      type: 'switch',
      maxItemNum: 3,
      dataSource: set,
      // iconTintColor: '#57BCFB',
      // checkboxColor: '#57BCFB',
      // tintColor: '#57BCFB',
      // confirmTextStyle: { color: '#57BCFB' },
      title: [climatemode],
      cancelText,
      confirmText,
      showBack: false,
      value: this.getDataSensors(),
      onMaskPress: ({ close }) => {
        close();
      },
      onConfirm: (value, { close }) => {
        this.sendDataSensors(value, { close });
      },
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.area} activeOpacity={0.8} onPress={() => this.climatemode()}>
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faListOl} color="#333" size={18} />
          <TYText style={styles.items}>{Strings.getLang('climatemodet')}</TYText>
        </View>
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faChevronRight} color="#666" size={15} />
        </View>
      </TouchableOpacity>
    );
  }
}

ClimateMode.propTypes = {
  SensorSet3: PropTypes.string,
};
ClimateMode.defaultProps = {
  SensorSet3: 'air_flour_12',
};

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  area0: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  items: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  SensorSet3: dpState[SensorSet3Code],
}))(ClimateMode);
