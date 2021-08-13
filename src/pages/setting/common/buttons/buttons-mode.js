/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Popup, Divider, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThLarge, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import ButtonMode12 from './buttons-mode12';

const { ClimateSelector: ClimateSelectorCode, ButtonSettings: ButtonSettingsCode } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class ButtonMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apl: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ButtonSettings !== nextProps.ButtonSettings) {
      this.setState({ apl: true });
    }

    if (nextProps.ButtonSettings) {
      setTimeout(() => {
        this.setState({ apl: false });
      }, 3000);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.area}
        activeOpacity={0.8}
        onPress={() => {
          const CliSel = this.props.ClimateSelector;
          Popup.custom({
            content: (
              <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 5 }}>
                  {/* <FontAwesomeIcon icon={faTh} color="#ffb700" size={25} alignSelf="center" /> */}
                  {/* <FontAwesomeIcon icon={faTh} color="#FF7300" size={25} alignSelf="center" /> */}
                </View>
                <ButtonMode12 />
                {this.state.apl === true ? (
                  <View>
                    <TYText style={styles.wait}>{Strings.getLang('apl')}</TYText>
                    <ActivityIndicator />
                  </View>
                ) : null}
                {CliSel === true ? (
                  <View>
                    <Divider />
                    <FontAwesomeIcon icon={faInfoCircle} size={16} margin={10} alignSelf="center" />
                    <TYText style={styles.annotation}>
                      {Strings.getLang('btn2cli')}
                      {'\n'}
                      {Strings.getLang('btn1cli')}
                    </TYText>
                  </View>
                ) : null}
              </ScrollView>
            ),
            title: Strings.getLang('buttonsmodetitle2'),
            cancelText,
            confirmText,
            onMaskPress: ({ close }) => {
              close();
            },
            onConfirm: (value, { close }) => {
              close();
            },
          });
        }}
      >
        <FontAwesomeIcon icon={faThLarge} color="#FF7300" size={18} />
        <TYText style={styles.items}>{Strings.getLang('buttonsmodetitle1')}</TYText>
      </TouchableOpacity>
    );
  }
}

ButtonMode.propTypes = {
  ClimateSelector: PropTypes.bool,
  ButtonSettings: PropTypes.string,
};

ButtonMode.defaultProps = {
  ClimateSelector: false,
  ButtonSettings: '0000',
};

const styles = StyleSheet.create({
  annotation: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    paddingBottom: 10,
    letterSpacing: 1,
  },
  wait: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    paddingBottom: 1,
    letterSpacing: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  items: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  ButtonSettings: dpState[ButtonSettingsCode],
}))(ButtonMode);
