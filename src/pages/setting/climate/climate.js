/* eslint-disable global-require */
// основной код климата
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Divider, SwitchButton, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSeedling,
  faInfoCircle,
  faListOl,
  faExchangeAlt,
  faSnowflake,
  faFireAlt,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../i18n/index.ts';
import dpCodes from '../../../config/dpCodes.ts';
import ClimateMode from './climatemode';
import ClimateInfo from './climateinfo';

const TYDevice = TYSdk.device;

const { ClimateSelector: ClimateSelectorCode, chSelector: chSelectorCode } = dpCodes;

// включение режима климата и переключение режима каналов
class ClimateScene extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      climate: this.props.ClimateSelector,
      apl: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ apl: true });
    }

    if (nextProps) {
      setTimeout(() => {
        this.setState({ apl: false });
      }, 3000);
    }
  }

  render() {
    const { ClimateSelector, chSelector } = this.props;
    return (
      <View style={styles.container}>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} />
            <TYText style={styles.items}>{Strings.getLang('climateSw')}</TYText>
          </SafeAreaView>
          <SwitchButton
            disabled={this.state.apl}
            style={styles.switch}
            tintColor="#ffb700"
            onTintColor="#90EE90"
            value={this.state.climate}
            onValueChange={() => {
              TYDevice.putDeviceData({
                [ClimateSelectorCode]: !ClimateSelector,
              });
              this.setState({ climate: !ClimateSelector });
            }}
          />
        </View>
        <Divider />
        <View style={styles.view}>
          <SafeAreaView style={styles.area}>
            <FontAwesomeIcon icon={faExchangeAlt} color="#90EE90" size={20} />
            <TYText style={styles.items}>{Strings.getLang('chSelector')}</TYText>
            <SafeAreaView style={styles.полюшко}>
              <Divider style={styles.divider} />
              <TYText style={styles.itemsCH}>I</TYText>
              <FontAwesomeIcon
                icon={chSelector === false ? faSnowflake : faFireAlt}
                color={chSelector === false ? '#00d0ff' : '#ffb700'}
                size={20}
                marginRight={10}
              />
              <Divider style={styles.divider} />
              <TYText style={styles.itemsCH}>II</TYText>
              <FontAwesomeIcon
                icon={chSelector === false ? faFireAlt : faSnowflake}
                color={chSelector === false ? '#ffb700' : '#00d0ff'}
                size={20}
                marginRight={10}
              />
              <Divider style={styles.divider} />
            </SafeAreaView>
          </SafeAreaView>
          {this.state.apl === true ? <ActivityIndicator color="#90EE90" /> : null}
          <SwitchButton
            disabled={this.state.apl}
            style={styles.switch}
            tintColor="#ffb700"
            onTintColor="#ffb700"
            value={chSelector}
            onValueChange={() => {
              TYDevice.putDeviceData({
                [chSelectorCode]: !chSelector,
              });
            }}
          />
        </View>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faListOl} color="#90EE90" size={20} />
          <ClimateMode />
        </SafeAreaView>
        <SafeAreaView style={styles.area}>
          <FontAwesomeIcon icon={faInfoCircle} color="#ffb700" size={20} />
          <ClimateInfo />
        </SafeAreaView>
        <Divider />
      </View>
    );
  }
}

ClimateScene.propTypes = {
  ClimateSelector: PropTypes.bool,
  chSelector: PropTypes.bool,
};

ClimateScene.defaultProps = {
  ClimateSelector: false,
  chSelector: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  полюшко: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  divider: {
    flexDirection: 'column',
  },
  itemsCH: {
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    paddingRight: 7,
    paddingLeft: 14,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    alignItems: 'center',
    fontSize: 16,
    padding: 14,
  },
  switch: {
    paddingRight: 14,
  },
});

export default connect(({ dpState }) => ({
  ClimateSelector: dpState[ClimateSelectorCode],
  chSelector: dpState[chSelectorCode],
}))(ClimateScene);
