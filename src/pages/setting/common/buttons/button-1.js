// основное меню для первой кнопки
import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYSdk, Tabs, Divider, TYText } from 'tuya-panel-kit';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import ButtonsTemp1S from './buttons-temp1';
import ButtonsTimer1S from './buttons-timer1';
import ButtonsTemp1CLI from './buttons-temp1CLI';
// import ButtonsTimer1CLI from './buttons-timer1CLI';

const TYDevice = TYSdk.device;
const { ClimateSelector: ClimateSelectorCode, ButtonSettings: ButtonSettingsCode } = dpCodes;

class Button1 extends React.PureComponent {
  constructor(props) {
    super(props);
    const { ClimateSelector, ButtonSettings } = this.props;
    this.state = {
      activeKey1: ButtonSettings.substring(0, 2),
      d1:
        ClimateSelector === true
          ? [
            { value: '00', label: Strings.getLang('buttonsmodenametemp') },
            { value: '02', label: Strings.getLang('buttonsmodenamemode') },
          ]
          : [
            { value: '00', label: Strings.getLang('buttonsmodenametemp') },
            { value: '01', label: Strings.getLang('buttonsmodenametimer') },
            { value: '02', label: Strings.getLang('buttonsmodenamemode') },
          ],
    };
  }

  _handleD1Change = tab => {
    this.setState({ activeKey1: tab.value, show: true });
    TYDevice.putDeviceData({
      [ButtonSettingsCode]: String(`${tab.value}${this.props.ButtonSettings.substring(2, 4)}`),
    });
  };

  render() {
    const { ClimateSelector } = this.props;
    return (
      <Tabs
        style={{ marginTop: 3 }}
        tabTextStyle={{ color: '#666' }}
        tabActiveStyle={{ width: '75%', height: 33, borderRadius: 10 }}
        tabActiveTextStyle={{ color: this.props.ClimateSelector === true ? '#57BCFB' : '#ffb700'}}
        underlineStyle={{ backgroundColor: this.props.ClimateSelector === true ? '#57BCFB' : '#ffb700' }}
        activeKey={this.state.activeKey1}
        dataSource={this.state.d1}
        swipeable={false}
        onChange={this._handleD1Change}
        maxItem={ClimateSelector === true ? 2 : 3}
      >
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          {ClimateSelector === true ? <ButtonsTemp1CLI /> : <ButtonsTemp1S />}
          <Divider />
        </Tabs.TabPanel>
        <Tabs.TabPanel style={styles.panelcontent}>
          <Divider />
          {ClimateSelector === true ? (
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            >
              <Divider />
              <FontAwesomeIcon
                icon={faInfoCircle}
                color="#666"
                size={40}
                margin={10}
                alignSelf="center"
              />
              <TYText style={{ fontSize: 16, textAlign: 'center', padding: 10 }}>
                {Strings.getLang('buttonsmodenamemodeCC')}
              </TYText>
              <Divider />
            </View>
          ) : (
            <ButtonsTimer1S />
          )}
          <Divider />
        </Tabs.TabPanel>
        <Tabs.TabPanel style={styles.panelcontent}>
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            <Divider />
            <FontAwesomeIcon
              icon={faInfoCircle}
              color="#666"
              size={40}
              margin={10}
              alignSelf="center"
            />
            <TYText style={{ fontSize: 16, textAlign: 'center', padding: 10 }}>
              {Strings.getLang('buttonsmodenamemodeZZ')}
            </TYText>
            <Divider />
          </View>
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
    // marginBottom: 10,
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  ButtonSettings: dpState[ButtonSettingsCode],
}))(Button1);
