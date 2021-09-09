import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import Zone1 from './zone1';
import Zone2 from './zone2';

const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

function Zones() {
  const [value, setValue] = useState('1');
  return windowHeight === 'normal' ? (
    <View style={styles.container}>
      <Zone1 />
      <Zone2 />
    </View>
  ) : (
    <Tabs
      // activeKey={this.state.activeKey1}
      dataSource={[
        { value: '1', label: '1' },
        { value: '2', label: '2' },
      ]}
      tabActiveTextStyle={value === '1' ? { color: '#ffb700' } : { color: '#ff7300' }}
      underlineStyle={value === '1' ? { backgroundColor: '#ffb700' } : { backgroundColor: '#ff7300' }}
      underlineWidth={100}
      onChange={tab => setValue(tab.value)}
      swipeable={false}
      maxItem={2}
    >
      <Tabs.TabPanel>
        <Zone1 />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <Zone2 />
      </Tabs.TabPanel>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  tabContent: {
    alignItems: 'center',
  },
});

export default Zones;
