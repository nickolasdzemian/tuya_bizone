// собственно сам выбор режимов (вкладки)
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Divider } from 'tuya-panel-kit';
import Strings from '../../../../i18n';
import Button1 from './button-1';
import Button2 from './button-2';

export default class ButtonsModeS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      d1: [
        { value: '1', label: Strings.getLang('buttonsmodetap1') },
        { value: '2', label: Strings.getLang('buttonsmodetap2') },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  render() {
    return (
      <Tabs
        style={styles.panel}
        activeKey={this.state.activeKey1}
        dataSource={this.state.d1}
        swipeable={true}
        onChange={this._handleD1Change}
      >
        <Tabs.TabPanel>
          <Divider />
          <Button1 />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <Divider />
          <Button2 />
        </Tabs.TabPanel>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    // paddingBottom: 5,
    // paddingTop: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  // panelcontent: {
  //   justifyContent: 'center',
  //   alignContent: 'center',
  //   paddingBottom: 5,
  //   paddingTop: 5,
  // },
});
