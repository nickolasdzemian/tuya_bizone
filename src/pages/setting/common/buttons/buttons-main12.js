// собственно сам выбор режимов (вкладки)
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs, Divider, TYText } from 'tuya-panel-kit';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
      d1:[
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
        tabActiveStyle={{ width: '70%', height: 33, borderRadius: 10, backgroundColor: '#f0f0f0' }}
        tabActiveTextStyle={this.props.ClimateSelector === true ? { color: '#57BCFB' } : null}
        tabPosition="top"
        underlineStyle={{ backgroundColor: 'transparent' }}
        dataSource={this.state.d1}
        swipeable={false}
        onChange={this._handleD1Change}
        maxItem={2}
      >
        <Tabs.TabPanel>
          <Divider />
          <Button1 />
        </Tabs.TabPanel>
        {this.props.ClimateSelector === true ? (
          <Tabs.TabPanel
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <View>
              <Divider />
              <FontAwesomeIcon icon={faInfoCircle} color="#666" size={40} margin={10} alignSelf="center" />
              <TYText style={{ fontSize: 16, textAlign: 'center', padding: 10 }}>
                {Strings.getLang('btn2cli')}
                {'\n'}
                {'\n'}
                {Strings.getLang('btn1cli')}
                {'\n'}
              </TYText>
              <Divider />
            </View>
          </Tabs.TabPanel>
        ) : (
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
