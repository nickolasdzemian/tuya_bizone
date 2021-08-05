import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Tabs } from 'tuya-panel-kit';
import Zone1 from './zone1';
import Zone2 from './zone2';

const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

const Zones = () =>
  windowHeight === 'normal' ? (
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
  tabContent: {
    alignItems: 'center'
  }
});

export default Zones;
