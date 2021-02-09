import React from 'react';
import { View, ScrollView } from 'react-native';
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
          activeKey={this.state.activeKey1}
          dataSource={this.state.d1}
          swipeable={true}
          onChange={this._handleD1Change}
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
