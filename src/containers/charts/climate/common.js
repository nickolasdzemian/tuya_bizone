// основное меню графиков температур
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import Strings from '../../../i18n';
import ScheduleScene1 from './cl';

export default class ChartPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      d1: [{ value: '1', label: Strings.getLang('climate_set') }],
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
          swipeable={false}
          onChange={this._handleD1Change}
        >
          <Tabs.TabPanel>
            <ScrollView>
              <ScheduleScene1 />
            </ScrollView>
          </Tabs.TabPanel>
        </Tabs>
      </View>
    );
  }
}
