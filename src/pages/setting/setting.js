/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Tabs, TYSdk, TYText, Utils, Notification } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { version } from '../../../package.json';
import Strings from '../../i18n/index.ts';
import dpCodes from '../../config/dpCodes.ts';
import Common from './common/index';
import ClimateScene from './climate/climate';
import ZonesScene from './zones/index';
import ChartView from '../stat/chart';

const TYDevice = TYSdk.device;
const { isIos } = Utils.RatioUtils;
const { Christ: ChristCode } = dpCodes;
const Christ = this.props;

export default class WithContentTabsSSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      d1: [
        { value: '0', label: 'ПопаЖопа'},
        { value: '1', label: Strings.getLang('common_set') },
        { value: '2', label: Strings.getLang('climate_set') },
        { value: '3', label: Strings.getLang('zones') },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  diablo() {
    TYDevice.putDeviceData({
      [ChristCode]: !Christ,
    });
    Notification.show({
      message: 'Под музыку Рождественского чуда ты инициировал вызов Сатаны. Да пребудет с тобой Его сила!',
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          style={{ paddingBottom: 10, marginVertical: 5 }}
          maxItem={4}
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          // swipeable={isIos}
          swipeable={false}
          velocityThreshold={0.65}
          onChange={this._handleD1Change}
          preload={false}
          activeColor="#474747"
          tabActiveTextStyle={{ fontWeight: 'bold', fontSize: 18 }}
          tabStyle={{ width: 90 }}
          tabActiveStyle={{ backgroundColor: '#fff' }}
          underlineStyle={{ backgroundColor: '#fff' }}
        >
          <Tabs.TabPanel>
            <ScrollView>
              <ChartView />
            </ScrollView>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <ScrollView>
              <Common />
              <ClimateScene />
              <ZonesScene />
              <TouchableOpacity 
                style={styles.ver} 
                onPress={() => TYSdk.mobile.jumpTo('https://sstcloud.ru/tuya/bizone')}
                alignSelf="center"
                onLongPress={() => this.diablo()}
              >
                <FontAwesomeIcon icon={faInfoCircle} color="#666" size={30} marginBottom={5} />
                <TYText style={{ color: '#333' }}>{Strings.getLang('faq')}</TYText>
                <TYText style={{ color: '#333' }}>{`v ${version}`}</TYText>
              </TouchableOpacity>
            </ScrollView>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <ScrollView>
              <ClimateScene />
            </ScrollView>
          </Tabs.TabPanel>
          <Tabs.TabPanel>
            <ScrollView>
              <ZonesScene />
            </ScrollView>
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ver: {
    alignContent: 'center',
    alignItems: 'center',
  },
  // tinyLogo: {
  //   alignItems: 'center',
  //   opacity: 50,
  // },
});
