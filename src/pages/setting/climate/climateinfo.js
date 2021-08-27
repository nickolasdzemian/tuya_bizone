// выбор датчиков для климат-режима
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExchangeAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const { chSelector: chSelectorCode } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

// определение массива с режимами
const set = [
  {
    key: 'true',
    title: Strings.getLang('chtrue'),
    value: 'true',
  },
  {
    key: 'false',
    title: Strings.getLang('chfalse'),
    value: 'false',
  },
];

class ClimateMode extends Component {
  channelss() {
    const { chSelector } = this.props;
    Popup.list({
      contentCenter: false,
      type: 'radio',
      maxItemNum: 2,
      dataSource: set,
      iconTintColor: '#90EE90',
      title: Strings.getLang('chSelector'),
      cancelText,
      confirmText,
      showBack: false,
      onConfirm: (value, { close }) => {
        // this.diablo();
        TYDevice.putDeviceData({
          [chSelectorCode]: value === 'true',
        });
        close();
      },
      value: String(chSelector),
      onMaskPress: ({ close }) => {
        close();
      },
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.area} activeOpacity={0.8} onPress={() => this.channelss()}>
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faExchangeAlt} color="#90EE90" size={18} />
          <TYText style={styles.items}>{Strings.getLang('chSelector')}</TYText>
        </View>
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faChevronRight} color="#666" size={15} />
        </View>
      </TouchableOpacity>
    );
  }
}

ClimateMode.propTypes = {
  chSelector: PropTypes.bool,
};
ClimateMode.defaultProps = {
  chSelector: false,
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
  chSelector: dpState[chSelectorCode],
}))(ClimateMode);
