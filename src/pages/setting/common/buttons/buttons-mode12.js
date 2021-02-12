/* eslint-disable react/destructuring-assignment */
// назначение режимов для 1 и 2 кнопки
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { TYSdk, Checkbox, Divider } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const { ClimateSelector: ClimateSelectorCode, ButtonSettings: ButtonSettingsCode } = dpCodes;

const buttonsmodetap1 = Strings.getLang('buttonsmodetap1');
const buttonsmodetap2 = Strings.getLang('buttonsmodetap2');

class ButtonMode12 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    const CliSel = this.props.ClimateSelector;
    return (
      <View style={styles.pickerContainer}>
        <View>
          <FontAwesomeIcon
            icon={faTh}
            color={CliSel === true ? '#90EE90' : '#ffb700'}
            size={25}
            alignSelf="center"
            marginBottom={5}
          />
          <Text style={styles.title}>{buttonsmodetap1}</Text>
          <Checkbox
            style={styles.check}
            color={CliSel === true ? '#90EE90' : '#ffb700'}
            checked={this.props.ButtonSettings.substring(0, 2) === '00'}
            onChange={checked =>
              TYDevice.putDeviceData({
                [ButtonSettingsCode]: String(`00${this.props.ButtonSettings.substring(2, 4)}`),
              })}
          >
            {Strings.getLang('buttonsmodenametemp')}
          </Checkbox>
          {CliSel === true ? null : (
            <Checkbox
              style={styles.check}
              color={CliSel === true ? '#90EE90' : '#ffb700'}
              checked={this.props.ButtonSettings.substring(0, 2) === '01'}
              onChange={checked =>
                TYDevice.putDeviceData({
                  [ButtonSettingsCode]: String(`01${this.props.ButtonSettings.substring(2, 4)}`),
                })}
            >
              {Strings.getLang('buttonsmodenametimer')}
            </Checkbox>
          )}
          <Checkbox
            style={styles.check}
            color={CliSel === true ? '#90EE90' : '#ffb700'}
            checked={this.props.ButtonSettings.substring(0, 2) === '02'}
            onChange={checked =>
              TYDevice.putDeviceData({
                [ButtonSettingsCode]: String(`02${this.props.ButtonSettings.substring(2, 4)}`),
              })}
          >
            {Strings.getLang('buttonsmodenamemode')}
          </Checkbox>
          <Checkbox
            style={styles.check}
            color="#000"
            checked={this.props.ButtonSettings.substring(0, 2) === '03'}
            onChange={checked =>
              TYDevice.putDeviceData({
                [ButtonSettingsCode]: String(`03${this.props.ButtonSettings.substring(2, 4)}`),
              })}
          >
            {Strings.getLang('nothing')}
          </Checkbox>
        </View>
        {/* <Divider style={{ flexDirection: 'column', width: 5, color: '#000' }} /> */}
        {CliSel === true ? null : (
          <View>
            <FontAwesomeIcon
              icon={faTh}
              color="#FF7300"
              size={25}
              alignSelf="center"
              marginBottom={5}
            />
            <Text style={styles.title}>{buttonsmodetap2}</Text>
            <Checkbox
              style={styles.check}
              color="#ff7300"
              checked={this.props.ButtonSettings.substring(2, 4) === '00'}
              onChange={checked =>
                TYDevice.putDeviceData({
                  [ButtonSettingsCode]: String(`${this.props.ButtonSettings.substring(0, 2)}00`),
                })}
            >
              {Strings.getLang('buttonsmodenametemp')}
            </Checkbox>
            {CliSel === true ? null : (
              <Checkbox
                style={styles.check}
                color="#ff7300"
                checked={this.props.ButtonSettings.substring(2, 4) === '01'}
                onChange={checked =>
                  TYDevice.putDeviceData({
                    [ButtonSettingsCode]: String(`${this.props.ButtonSettings.substring(0, 2)}01`),
                  })}
              >
                {Strings.getLang('buttonsmodenametimer')}
              </Checkbox>
            )}
            <Checkbox
              style={styles.check}
              color="#ff7300"
              checked={this.props.ButtonSettings.substring(2, 4) === '02'}
              onChange={checked =>
                TYDevice.putDeviceData({
                  [ButtonSettingsCode]: String(`${this.props.ButtonSettings.substring(0, 2)}02`),
                })}
            >
              {Strings.getLang('buttonsmodenamemode')}
            </Checkbox>
            <Checkbox
              style={styles.check}
              color="#000"
              checked={this.props.ButtonSettings.substring(2, 4) === '03'}
              onChange={checked =>
                TYDevice.putDeviceData({
                  [ButtonSettingsCode]: String(`${this.props.ButtonSettings.substring(0, 2)}03`),
                })}
            >
              {Strings.getLang('nothing')}
            </Checkbox>
          </View>
        )}
      </View>
    );
  };
}

ButtonMode12.propTypes = {
  ClimateSelector: PropTypes.bool,
  ButtonSettings: PropTypes.string,
};

ButtonMode12.defaultProps = {
  ClimateSelector: false,
  ButtonSettings: '0000',
};

const styles = StyleSheet.create({
  check: {
    margin: 9,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  pickerContainer: {
    // height: 188,
    flex: 1,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
  },

  title: {
    marginTop: 1,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 20,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  ButtonSettings: dpState[ButtonSettingsCode],
}))(ButtonMode12);
