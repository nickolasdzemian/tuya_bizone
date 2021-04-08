/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Tabs, TYSdk, TYText, Utils } from 'tuya-panel-kit';
import { version } from '../../../package.json';
import Strings from '../../i18n/index.ts';
import dpCodes from '../../config/dpCodes.ts';
import Common from './common/index';
import ClimateScene from './climate/climate';
import ZonesScene from './zones/index';

const TYDevice = TYSdk.device;
const { isIos } = Utils.RatioUtils;
const { Christ: ChristCode } = dpCodes;
const Christ = this.props;

const Christmass = () =>
  TYDevice.putDeviceData({
    [ChristCode]: !Christ,
  });

export default class WithContentTabsSSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      d1: [
        { value: '1', label: Strings.getLang('common_set') },
        { value: '2', label: Strings.getLang('climate_set') },
        { value: '3', label: Strings.getLang('zones') },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          style={{ paddingBottom: 10, marginVertical: 5 }}
          maxItem={3}
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={isIos}
          velocityThreshold={0.65}
          onChange={this._handleD1Change}
          preload={false}
          activeColor="#474747"
          tabActiveTextStyle={{ fontWeight: 'bold', fontSize: 20 }}
          tabStyle={{ width: 80 }}
          tabActiveStyle={{ backgroundColor: '#fff' }}
          underlineStyle={{ backgroundColor: '#fff' }}
        >
          <Tabs.TabPanel>
            <ScrollView>
              <Common />
              {/* <SafeAreaView style={styles.tinyLogo}>
                <Image style={styles.tinyLogo} source={require('../../../res/ATL.png')} />
              </SafeAreaView> */}
              <TouchableOpacity style={styles.ver} onLongPress={Christmass}>
                <TYText style={styles.ver}>
                  v
                  {version}
                  {' '}
                  with Tuya cloud support
                  {'\n'}
                  by nickolashka
                  {'\n'}
                  for development purposes only
                  {'\n'}
                  n.pozdnyakov@sst.ru
                </TYText>
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
    textAlign: 'center',
    color: 'red',
    fontWeight: '100',
    fontSize: 10,
    flexWrap: 'wrap',
    letterSpacing: 2,
    marginTop: 120,
  },
  // tinyLogo: {
  //   alignItems: 'center',
  //   opacity: 50,
  // },
});
