/* eslint-disable global-require */
// основной код климата
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { TYSdk, TYText, Notification, Popup, Divider } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faProjectDiagram,
  faSlidersH,
  faAngleUp,
  faRulerCombined,
  faChartLine,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';
import ClimateMode from './climatemode';
import Channel from './climateinfo';

const TYDevice = TYSdk.device;

const {
  Zone: ZoneCode,
  ClimateSelector: ClimateSelectorCode,
  chSelector: chSelectorCode,
  ButtonSettings: ButtonSettingsCode,
  chart_1_part_1: chart_1_part_1Code,
  chart_1_part_2: chart_1_part_2Code,
  chart_1_part_3: chart_1_part_3Code,
  chart_1_part_4: chart_1_part_4Code,
} = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

const set = [
  {
    key: 'true',
    title: Strings.getLang('climateTON'),
    value: 'true',
  },
  {
    key: 'false',
    title: Strings.getLang('climateTOFF'),
    value: 'false',
  },
];

// включение режима климата и переключение режима каналов
class ClimateScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      apl: false,
      bar: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ apl: true });
    }

    if (nextProps) {
      setTimeout(() => {
        this.setState({ apl: false });
      }, 3000);
    }
  }

  diablo() {
    Notification.show({
      message: Strings.getLang('ModeChanged'),
      onClose: () => {
        Notification.hide();
      },
      theme: {
        successIcon: 'red',
        errorIcon: 'yellow',
        warningIcon: 'black',
      },
    });
  }

  goToSettingsZZZ = () => {
    TYSdk.Navigator.push({
      id: 'ZonesScene',
      title: Strings.getLang('ZonesScene'),
    });
  };

  goToSettingsSSS = () => {
    TYSdk.Navigator.push({
      id: 'CounterChartsScene',
      title: Strings.getLang('CounterChartsScene'),
    });
  };

  render() {
    const { ClimateSelector } = this.props;
    const hidden = this.state.bar;
    return (
      <View style={styles.container}>
        <View style={styles.viewUp}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon
              icon={ClimateSelector === true ? faSeedling : faProjectDiagram}
              color={ClimateSelector === true ? '#90EE90' : '#ffb700'}
              size={25}
            />
            <View>
              <TYText style={styles.items}>{Strings.getLang('globalMode')}</TYText>
              <TYText style={styles.subitems}>
                {Strings.getLang(ClimateSelector === true ? 'climateON' : 'climateOFF')}
              </TYText>
            </View>
          </SafeAreaView>
          {this.state.apl === true ? (
            <ActivityIndicator color={ClimateSelector === true ? '#90EE90' : '#ff7300'} />
          ) : null}
          <TouchableOpacity
            style={styles.top}
            activeOpacity={0.9}
            onPress={() => {
              Popup.list({
                contentCenter: false,
                type: 'radio',
                maxItemNum: 2,
                dataSource: set,
                iconTintColor: '#90EE90',
                title: Strings.getLang('climateSw'),
                subTitle: Strings.getLang('climateinfo'),
                subTitleTextStyle: { color: 'red' },
                cancelText,
                confirmText,
                showBack: false,
                onBack: ({ close }) => {
                  close();
                },
                value: String(ClimateSelector),
                footerType: 'both',
                onMaskPress: ({ close }) => {
                  close();
                },
                onConfirm: (value, { close }) => {
                  // this.diablo();
                  TYDevice.putDeviceData({
                    [ClimateSelectorCode]: value === 'true',
                    [ZoneCode]: '000000',
                    [ButtonSettingsCode]: '0000',
                  });
                  // ClimateSelector === true ?
                  //   TYDevice.putDeviceData({
                  //     [chart_1_part_1Code]: '000000',
                  //     [chart_1_part_2Code]: '000000',
                  //     [chart_1_part_3Code]: '000000',
                  //     [chart_1_part_4Code]: '000000',
                  //   }) : null;
                  close();
                },
              });
            }}
          >
            <FontAwesomeIcon
              icon={hidden === true ? faSlidersH : faAngleUp}
              color="#666"
              size={25}
              marginRight={30}
            />
          </TouchableOpacity>
        </View>
        <Divider style={{ marginTop: 8 }} />
        {ClimateSelector === true ? (
          <ClimateMode />
        ) : (
          <TouchableOpacity
            style={[styles.area2, { justifyContent: 'space-between' }]}
            activeOpacity={0.8}
            onPress={() => this.goToSettingsZZZ()}
          >
            <View style={styles.area0}>
              <FontAwesomeIcon icon={faRulerCombined} color="#ffb700" size={18} />
              <TYText style={styles.items2}>{Strings.getLang('ZonesScene')}</TYText>
            </View>
            <View style={styles.area0}>
              <FontAwesomeIcon icon={faChevronRight} color="#666" size={15} />
            </View>
          </TouchableOpacity>
        )}
        {ClimateSelector === true ? <Channel /> : null}
        <TouchableOpacity
          style={[styles.area2, { justifyContent: 'space-between' }]}
          activeOpacity={0.8}
          onPress={() => this.goToSettingsSSS()}
        >
          <View style={styles.area0}>
            <FontAwesomeIcon icon={faChartLine} color="#666" size={18} />
            <TYText style={styles.items2}>{Strings.getLang('CounterChartsScene')}</TYText>
          </View>
          <View style={styles.area0}>
            <FontAwesomeIcon icon={faChevronRight} color="#666" size={15} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ClimateScene.propTypes = {
  ClimateSelector: PropTypes.bool,
  Zone: PropTypes.string,
  ButtonSettings: PropTypes.string,
  chart_1_part_1: PropTypes.string,
  chart_1_part_2: PropTypes.string,
  chart_1_part_3: PropTypes.string,
  chart_1_part_4: PropTypes.string,
};

ClimateScene.defaultProps = {
  ClimateSelector: false,
  Zone: '010101',
  ButtonSettings: '0000',
  chart_1_part_1: '000000',
  chart_1_part_2: '000000',
  chart_1_part_3: '000000',
  chart_1_part_4: '000000',
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  viewUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#fff',
    // height: '25%',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  items: {
    alignItems: 'center',
    fontSize: 20,
    paddingTop: 14,
    paddingLeft: 14,
  },
  subitems: {
    alignItems: 'center',
    color: '#949494',
    paddingLeft: 14,
    paddingBottom: 14,
  },
  area2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    // backgroundColor: '#fff',
    borderRadius: 12,
  },
  area0: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  items2: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  chSelector: dpState[chSelectorCode],
  ButtonSettings: dpState[ButtonSettingsCode],
  chart_1_part_1: dpState[chart_1_part_1Code],
  chart_1_part_2: dpState[chart_1_part_2Code],
  chart_1_part_3: dpState[chart_1_part_3Code],
  chart_1_part_4: dpState[chart_1_part_4Code],
}))(ClimateScene);
