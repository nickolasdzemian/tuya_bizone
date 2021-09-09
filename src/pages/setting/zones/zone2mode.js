// Зона 2 - выбор датчиков для работы
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faListOl } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n';
import dpCodes from '../../../config/dpCodes';

const TYDevice = TYSdk.device;

const { SensorSet2: SensorSet2Code } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const climatemode = Strings.getLang('climatemode');
const zoneSens = Strings.getLang('zoneSens');

// определение массива с датчиками
const set = [
  {
    key: 'air',
    title: Strings.getLang('air'),
    value: 'air',
  },
  {
    key: 'flour',
    title: Strings.getLang('flour2'),
    value: 'flour',
  },
  {
    key: 'air_flour',
    title: Strings.getLang('air_flour2'),
    value: 'air_flour',
  },
];

class Zone2Mode extends Component {
  static propTypes = {
    SensorSet2: PropTypes.string,
  };
  static defaultProps = {
    SensorSet2: 'air_flour',
  };

  getDataSensors() {
    const { SensorSet2 } = this.props;
    return SensorSet2;
  }

  get data() {
    return [
      {
        key: this.getDataSensors(),
        title: zoneSens,
        onPress: () => {
          Popup.list({
            contentCenter: false,
            type: 'radio',
            maxItemNum: 3,
            dataSource: set,
            iconTintColor: '#FF7300',
            title: [climatemode],
            cancelText,
            confirmText,
            confirmTextStyle: { color: '#ff7300' },
            showBack: false,
            onBack: ({ close }) => {
              console.log('Select climate --none');
              close();
            },
            value: this.getDataSensors(),
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            onSelect: (value, { close }) => {
              TYDevice.putDeviceData({
                [SensorSet2Code]: value,
              });
              // close();
            },
          });
        },
      },
    ];
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.area}
        onPress={() =>
          Popup.list({
            contentCenter: false,
            type: 'radio',
            maxItemNum: 3,
            dataSource: set,
            iconTintColor: '#FF7300',
            title: [climatemode],
            cancelText,
            confirmText,
            showBack: false,
            onBack: ({ close }) => {
              console.log('Select climate --none');
              close();
            },
            value: this.getDataSensors(),
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => {
              close();
            },
            onSelect: (value, { close }) => {
              TYDevice.putDeviceData({
                [SensorSet2Code]: value,
              });
              close();
            },
          })}
      >
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faListOl} color="#333" size={20} />
          <TYText style={styles.items}>{zoneSens}</TYText>
        </View>
        <FontAwesomeIcon icon={faChevronRight} color="#ff7300" size={15} marginRight={10} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
    margin: 14,
    marginTop: 8 + 14,
    marginBottom: 8 + 14,
    justifyContent: 'space-between',
  },
  area0: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  items: {
    marginLeft: 14,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  SensorSet2: dpState[SensorSet2Code],
}))(Zone2Mode);
