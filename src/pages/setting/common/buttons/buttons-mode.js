/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { TYFlatList, Popup, Divider } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTh, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';
import ButtonMode12 from './buttons-mode12';

const { ClimateSelector: ClimateSelectorCode } = dpCodes;

const cancelText = Strings.getLang('cancelText');
const confirmText = Strings.getLang('confirmText');

class ButtonMode extends Component {
  get data() {
    return [
      {
        key: 'custom',
        title: Strings.getLang('buttonsmodetitle1'),
        onPress: () => {
          const CliSel = this.props.ClimateSelector;
          Popup.custom({
            content: (
              <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 5 }}>
                  {/* <FontAwesomeIcon icon={faTh} color="#ffb700" size={25} alignSelf="center" /> */}
                  {/* <FontAwesomeIcon icon={faTh} color="#FF7300" size={25} alignSelf="center" /> */}
                </View>
                <ButtonMode12 />
                {CliSel === true ? (
                  <View>
                    <Divider />
                    <FontAwesomeIcon icon={faInfoCircle} size={16} margin={10} alignSelf="center" />
                    <Text style={styles.annotation}>{Strings.getLang('btn2cli')}</Text>
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
            onConfirm: () => {
              Popup.close();
            },
          });
        },
      },
    ];
  }

  render() {
    return <TYFlatList contentContainerStyle={{ paddingTop: 1 }} data={this.data} />;
  }
}
ButtonMode.propTypes = {
  ClimateSelector: PropTypes.bool,
};

ButtonMode.defaultProps = {
  ClimateSelector: false,
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
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
}))(ButtonMode);
