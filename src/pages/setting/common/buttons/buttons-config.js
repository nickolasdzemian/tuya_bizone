/* eslint-disable react/destructuring-assignment */
// настройка температур для 1 кнопки
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Popup, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGripVertical, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { Cache } from 'react-native-cache';
// import { NumberUtils } from 'tuya-panel-kit/src/utils';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import ButtonsModeS from './buttons-main12';

// const TYDevice = TYSdk.device;
const { PresetTemperature: PresetTemperatureCode, ClimateSelector: ClimateSelectorCode } = dpCodes;
const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

// const cache = new Cache({
//   namespace: 'BtnsConfig',
//   policy: {
//     maxEntries: 50000,
//   },
//   backend: AsyncStorage,
// });

class ButtonsConfig extends Component {
  constructor(props) {
    super(props);
    // const iT = this.props.PresetTemperature.match(/(..?)/g);
    this.state = {
    //   config: 0,
    };
  }

  goToSettingsBBB = () => {
    TYSdk.Navigator.push({
      id: 'ButtonsScene',
      title: Strings.getLang('buttonsmodetap0'),
    });
  };

  buttonsConfiguration() {
    // const config = this.props.PresetTemperature;
    // cache.set('fullconfig', config);
    // this.setState({ config });
    Popup.custom({
      content: (
        <SafeAreaView style={{ height: Dimensions.get('window').height - (Dimensions.get('window').height * 0.33), backgroundColor: '#fff' }}>
          <ButtonsModeS />
        </SafeAreaView>
      ),
      title: Strings.getLang('buttonsmodetitle2'),
      cancelText: Strings.getLang('cancelText'),
      confirmText: Strings.getLang('confirmText'),
      footerType: 'singleCancel',
      onMaskPress: ({ close }) => {
        // cache.set('fullconfig', config);
        close();
      },
      onConfirm: (value, { close }) => {
        // this._handleComplete();
        close();
      },
    });
  }

  //   async _setConfig() {
  //     const full = await cache.get('fullconfig');
  //     this.setState({ config: full });
  //   }

  //   async _handleComplete() {
  //     await cache.get('fullconfig').then(response => {
  //       this.setState({ config: response });
  //     });
  //     console.log(this.props.PresetTemperature, 'ПИЗДА ЕЖУ000');
  //     TYDevice.putDeviceData({
  //       [PresetTemperatureCode]: this.state.config,
  //     });
  //     console.log(this.state.config, 'ПИЗДА ЕЖУ');
  //   };

  // const data = cache.get('fullconfig').then(response => {
  //     this.setState({ config: response });
  //   });

  render() {
    return (
      <TouchableOpacity
        style={styles.area}
        activeOpacity={0.8}
        onPress={
          windowHeight === 'normal'
            ? () => this.buttonsConfiguration()
            : () => this.goToSettingsBBB()
        }
        onLongPress={windowHeight === 'normal' ? () => this.goToSettingsBBB() : null}
      >
        <View style={styles.area0}>
          <FontAwesomeIcon icon={faGripVertical} color="#333" size={18} />
          <TYText style={styles.items}>{Strings.getLang('buttonsmodetap0')}</TYText>
        </View>
        <View style={styles.area0}>
          <FontAwesomeIcon
            icon={faChevronRight}
            color={this.props.ClimateSelector === true ? '#666' : '#ff7300'}
            size={15}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

// ButtonsConfig.propTypes = {
//   PresetTemperature: PropTypes.string,
// };

// ButtonsConfig.defaultProps = {
//   PresetTemperature: '23180c1c180c1c180c',
// };

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    // backgroundColor: '#fff',
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
  PresetTemperature: dpState[PresetTemperatureCode],
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ButtonsConfig);
