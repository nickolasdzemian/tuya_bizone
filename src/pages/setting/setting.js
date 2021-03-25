import React from 'react';
import { View, ScrollView, Easing } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import Strings from '../../i18n';
import Common from './common/index';
import ClimateScene from './climate/climate';
import ZonesScene from './zones/index';

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
        {/* https://github.com/facebook/react-native/issues/11206 */}
        <Tabs
          style={{ borderRadius: 10, paddingTop: 8, marginVertical: 5 }}
          maxItem={3}
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={true}
          velocityThreshold={0.65}
          onChange={this._handleD1Change}
          preload={false}
          animationConfig={{ duration: 200, easing: Easing.cubic }}
          activeColor="#474747"
          tabActiveTextStyle={{ fontWeight: 'bold', fontSize: 20 }}
          tabStyle={{ width: 80 }}
          tabActiveStyle={{ backgroundColor: '#fff' }}
          underlineStyle={{ backgroundColor: '#fff' }}
        >
          <Tabs.TabPanel>
            <ScrollView>
              <Common />
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
