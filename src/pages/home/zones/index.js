import React from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Tabs, TYSdk } from 'tuya-panel-kit';
import { Cache } from 'react-native-cache';
import Zone1 from './zone1';
import Zone2 from './zone2';

const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

class Zones extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hide1: false,
      hide2: false,
      activeKey: '1',
    };
    this.cache = new Cache({
      namespace: `ZNames_${TYSdk.devInfo.devId}`,
      policy: {
        maxEntries: 5000,
      },
      backend: AsyncStorage,
    });
    this.getHide1();
    this.getHide2();
  }

  getHide1() {
    this.cache.get('hide1').then(response => {
      this.setState({ hide1: response });
    });
  }

  getHide2() {
    this.cache.get('hide2').then(response => {
      this.setState({ hide2: response });
    });
  }

  render() {
    const value = this.state.activeKey;
    const hide1 = this.state.hide1;
    const hide2 = this.state.hide2;
    console.log(hide1, hide2, 'HHHHHHHHHHHHHHHHHHHHH');
    return windowHeight === 'normal' ? (
      <View style={styles.container}>
        {hide1 === undefined || hide1 === false ? <Zone1 /> : null}
        {hide2 === undefined || hide2 === false ? <Zone2 /> : null}
      </View>
    ) : (
      <Tabs
        // activeKey={this.state.activeKey1}
        dataSource={
          hide1 === true
            ? [{ value: '2', label: '2' }]
            : hide2 === true
              ? [{ value: '1', label: '1' }]
              : [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
              ]
        }
        tabActiveTextStyle={value === '1' ? { color: '#ffb700' } : { color: '#ff7300' }}
        underlineStyle={
          value === '1' ? { backgroundColor: '#ffb700' } : { backgroundColor: '#ff7300' }
        }
        underlineWidth={100}
        onChange={tab => this.setState({ activeKey: tab.value })}
        swipeable={false}
        maxItem={hide1 === true || hide2 === true ? 1 : 2}
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0',
  },
});

export default Zones;
