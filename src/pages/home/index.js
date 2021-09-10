import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, AsyncStorage, Image, Dimensions } from 'react-native';
import { TYText, TYSdk, Utils } from 'tuya-panel-kit';
import { Cache } from 'react-native-cache';
import dpCodes from '../../config/dpCodes.ts';
import ClimateReport from './ClimateReport';
import ClimateM from './climate/climate';
import Zones from './zones/index';
import ClimateController from './climate/controller';
import Strings from '../../i18n/index.ts';

const { ClimateSelector: ClimateSelectorCode } = dpCodes;
const { isIos } = Utils.RatioUtils;
const TYDevice = TYSdk.device;
const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

// const cache = new Cache({
//   namespace: TYSdk.devInfo.devId,
//   policy: {
//     maxEntries: 10,
//   },
//   backend: AsyncStorage,
// });

class ClimateMain extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ini: 'false',
    };
    this.cache = new Cache({
      namespace: `ini_${TYSdk.devInfo.devId}`,
      policy: {
        maxEntries: 10,
      },
      backend: AsyncStorage,
    });
    this.getName();
  }

  // Получение данных из хранилища, если данные получены, то меню первого запуска не открывается
  getName() {
    let ini = undefined;
    this.cache.get('ini').then(response => {
      this.setState({ ini: response });
    });
    ini = this.state.ini;
    return ini;
  }

  render() {
    this.getName();
    const { ini } = this.state;
    const { ClimateSelector } = this.props;
    return ini === undefined ? (
      // Выбор режима работы + опции при первом запуске приложения
      <View style={styles.container}>
        {windowHeight === 'normal' ? (
          <Image style={styles.tinyLogo} source={require('../../res/sex.png')} />
        ) : null}
        <TYText style={[styles.text, { marginTop: 20 }]}>{Strings.getLang('iniTitle')}</TYText>
        <TYText style={[styles.text, { fontSize: 10, marginBottom: 20 }]}>{Strings.getLang('iniSubTitle')}</TYText>
        <TouchableOpacity
          onPress={() => {
            TYSdk.native.showLoading({ title: Strings.getLang('load') });
            TYDevice.putDeviceData({
              [ClimateSelectorCode]: true,
            });
            this.cache.set('ini', 'false');
            setTimeout(() => {
              this.setState({ ini: 'false' });
              TYSdk.native.hideLoading();
            }, 2000);
          }}
          style={styles.touch2}
        >
          <TYText style={styles.text}>{Strings.getLang('climateTON')}</TYText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            TYSdk.native.showLoading({ title: Strings.getLang('load') });
            TYDevice.putDeviceData({
              [ClimateSelectorCode]: false,
            });
            this.cache.set('ini', 'false');
            setTimeout(() => {
              this.setState({ ini: 'false' });
              TYSdk.native.hideLoading();
            }, 2000);
          }}
          style={[styles.touch2, { marginBottom: 20 }]}
        >
          <TYText style={styles.text}>{Strings.getLang('climateTOFF')}</TYText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            TYSdk.native.showLoading({ title: Strings.getLang('load') });
            this.cache.set('ini', 'false');
            setTimeout(() => {
              this.setState({ ini: 'false' });
              TYSdk.native.hideLoading();
            }, 2000);
          }}
          style={styles.touch2}
        >
          <TYText style={[styles.text, { fontSize: 18 }]}>{Strings.getLang('iniGone')}</TYText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TYSdk.mobile.jumpTo('https://sstcloud.ru/tuya/bizone')}
          style={styles.touch2}
        >
          <TYText style={[styles.text, { fontSize: 18 }]}>{Strings.getLang('manual')}</TYText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.cache.set('ini', 'false');
            this.setState({ ini: 'false' });
            TYSdk.Navigator.push({
              id: 'SettingScene',
              title: Strings.getLang('settings'),
            });
          }}
          style={[styles.touch2, { marginBottom: isIos === true ? 33 : 12 }]}
        >
          <TYText style={[styles.text, { fontSize: 18 }]}>{Strings.getLang('inisettings')}</TYText>
        </TouchableOpacity>
      </View>
    ) : (
      // Главный экран
      <View style={styles.container}>
        {ClimateSelector === true ? (
          <View>
            <ClimateReport />
            <ClimateM />
          </View>
        ) : (
          <Zones />
        )}
        {ClimateSelector === true ? (
          <ClimateController />
        ) : (
          <TouchableOpacity
            onPress={() =>
              TYSdk.Navigator.push({
                id: 'SettingScene',
                title: Strings.getLang('settings'),
              })}
            style={styles.touch}
          >
            <TYText style={styles.text}>{Strings.getLang('settings')}</TYText>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

ClimateMain.propTypes = {
  ClimateSelector: PropTypes.bool,
};

ClimateMain.defaultProps = {
  ClimateSelector: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    fontSize: 20,
  },
  touch: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 50,
    margin: 8,
    marginBottom: isIos === true ? 33 : 12,
    justifyContent: 'center',
  },
  touch2: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 50,
    margin: 8,
    justifyContent: 'center',
  },
  tinyLogo: {
    alignSelf: 'center',
    width: 240,
    height: 165,
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ClimateMain);
