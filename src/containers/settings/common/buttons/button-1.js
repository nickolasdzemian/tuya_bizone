// основное меню для первой кнопки
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Divider } from 'tuya-panel-kit';
import Strings from '../../../../i18n';
import ButtonsTemp1S from './buttons-temp1';
import ButtonsTimer1S from './buttons-timer1';

export default class Button1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      d1: [
        { value: '1', label: Strings.getLang('buttonsmodenametemp') },
        { value: '2', label: Strings.getLang('buttonsmodenametimer') },
      ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value });
  };

  render() {
    return (
      <Tabs
        activeKey={this.state.activeKey1}
        dataSource={this.state.d1}
        swipeable={false}
        onChange={this._handleD1Change}
      >
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          <ButtonsTemp1S />
          <Divider />
        </Tabs.TabPanel>
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          <ButtonsTimer1S />
          <Divider />
        </Tabs.TabPanel>
      </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  panelcontent: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 10,
  },
});
