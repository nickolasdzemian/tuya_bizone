// собственно сам выбор режимов (вкладки)
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs, Divider } from 'tuya-panel-kit';
import { connect } from 'react-redux';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import Button1 from './button-1';
import Button2 from './button-2';

const { ClimateSelector: ClimateSelectorCode } = dpCodes;
class ButtonsModeS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey1: '1',
      d1: this.props.ClimateSelector === true ? [
        { value: '1', label: Strings.getLang('buttonsmodetap1') },
      ] : [
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
        maxItem={2}
      >
        <Tabs.TabPanel>
          <Divider />
          <Button1 />
        </Tabs.TabPanel>
        {this.props.ClimateSelector === true ? null : (
          <Tabs.TabPanel>
            <Divider />
            <Button2 />
          </Tabs.TabPanel>
        )}
      </Tabs>
    );
  }
}

ButtonsModeS.propTypes = {
  ClimateSelector: PropTypes.bool,
};

ButtonsModeS.defaultProps = {
  ClimateSelector: false,
};

const styles = StyleSheet.create({
  panel: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ButtonsModeS);
