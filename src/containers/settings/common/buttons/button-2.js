// основное меню для второй кнопки
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Divider } from 'tuya-panel-kit';
import Strings from '../../../../i18n';
import ButtonsTemp2S from './buttons-temp2';
import ButtonsTimer2S from './buttons-timer2';

export default class Button2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey2: '3',
      d2: [
        { value: '3', label: Strings.getLang('buttonsmodenametemp') },
        { value: '4', label: Strings.getLang('buttonsmodenametimer') },
      ],
    };
  }

  _handleD2Change = tab => {
    this.setState({ activeKey2: tab.value });
  };

  render() {
    return (
      <Tabs
        activeKey={this.state.activeKey2}
        dataSource={this.state.d2}
        swipeable={false}
        onChange={this._handleD2Change}
      >
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          <ButtonsTemp2S />
          <Divider />
        </Tabs.TabPanel>
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          <ButtonsTimer2S />
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
  },
});
