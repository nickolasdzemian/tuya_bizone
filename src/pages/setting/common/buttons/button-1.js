// основное меню для первой кнопки
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Divider } from 'tuya-panel-kit';
import { connect } from 'react-redux';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import ButtonsTemp1S from './buttons-temp1';
import ButtonsTimer1S from './buttons-timer1';
import ButtonsTemp1CLI from './buttons-temp1CLI';
import ButtonsTimer1CLI from './buttons-timer1CLI';

const { ClimateSelector: ClimateSelectorCode, ButtonSettings: ButtonSettingsCode } = dpCodes;

class Button1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: this.props.ButtonSettings.substring(0, 2) === '01' ? '2' : '1',
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
        maxItem={4}
      >
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          {this.props.ClimateSelector === true ? <ButtonsTemp1CLI /> : <ButtonsTemp1S />}
          <Divider />
        </Tabs.TabPanel>
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          {this.props.ClimateSelector === true ? <ButtonsTimer1CLI /> : <ButtonsTimer1S />}
          <Divider />
        </Tabs.TabPanel>
      </Tabs>
    );
  }
}

Button1.propTypes = {
  ClimateSelector: PropTypes.bool,
  ButtonSettings: PropTypes.string,
};

Button1.defaultProps = {
  ClimateSelector: false,
  ButtonSettings: '0000',
};

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

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  ButtonSettings: dpState[ButtonSettingsCode],
}))(Button1);
