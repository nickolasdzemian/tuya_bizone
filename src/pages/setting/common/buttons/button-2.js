// основное меню для второй кнопки
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYSdk, Tabs, Divider, TYText } from 'tuya-panel-kit';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import ButtonsTemp2S from './buttons-temp2';
import ButtonsTimer2S from './buttons-timer2';

const TYDevice = TYSdk.device;
const { ButtonSettings: ButtonSettingsCode } = dpCodes;
class Button2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey2: this.props.ButtonSettings.substring(2, 4),
      d2: [
        { value: '0000', label: null },
        { value: '00', label: Strings.getLang('buttonsmodenametemp') },
        { value: '01', label: Strings.getLang('buttonsmodenametimer') },
        // { value: '02', label: Strings.getLang('buttonsmodenamemode') },
      ],
    };
  }

  _handleD2Change = tab => {
    this.setState({ activeKey2: tab.value === '0000' ? '00' : tab.value });
    TYDevice.putDeviceData({
      [ButtonSettingsCode]: String(`${this.props.ButtonSettings.substring(0, 2)}${tab.value === '0000' ? '00' : tab.value}`),
    });
  };

  render() {
    return (
      <Tabs
        // style={{ justifyContent: 'flex-end' }}
        style={{ marginTop: 3 }}
        tabTextStyle={{ color: '#666' }}
        tabActiveStyle={{ width: '75%', height: 33, borderRadius: 10 }}
        tabActiveTextStyle={{ color: this.props.ClimateSelector === true ? '#57BCFB' : '#ff7300'}}
        underlineStyle={{ backgroundColor: this.props.ClimateSelector === true ? '#57BCFB' : '#ff7300' }}
        activeKey={this.state.activeKey2}
        dataSource={this.state.d2}
        swipeable={false}
        onChange={this._handleD2Change}
        maxItem={3}
      >
        <Tabs.TabPanel style={styles.panelcontent} />
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

Button2.propTypes = {
  ButtonSettings: PropTypes.string,
};

Button2.defaultProps = {
  ButtonSettings: '0000',
};

const styles = StyleSheet.create({
  panelcontent: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5,
  },
});

export default connect(({ dpState }) => ({
  ButtonSettings: dpState[ButtonSettingsCode],
}))(Button2);
