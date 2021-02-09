/* eslint-disable react/destructuring-assignment */
// отображение всех элементов типа (report only) в режиме климат-контроля
import PropTypes from 'prop-types';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faExclamationTriangle,
  faSeedling,
  faSnowflake,
  faFireAlt,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../i18n/index.ts';
import dpCodes from '../../config/dpCodes.ts';

const {
  chSelector: chSelectorCode,
  Relay1flag: Relay1flagCode,
  Relay2flag: Relay2flagCode,
  RelayPower1: RelayPower1Code,
  RelayPower2: RelayPower2Code,
  FaultAlarm: FaultAlarmCode,
  SensorSet3: SensorSet3Code,
  ReportTemperature: ReportTemperatureCode,
} = dpCodes;

class ClimateReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      chSelector,
      Relay1flag,
      Relay2flag,
      RelayPower1,
      RelayPower2,
      FaultAlarm,
      SensorSet3,
    } = this.props;

    const t = this.props.ReportTemperature;
    const t1 = t.substring(0, 2);
    const t10 = parseInt(t1, 16);
    const t11 = t10 > 100 ? -(256 - t10) : t10;
    const t2 = t.substring(2, 4);
    const t20 = parseInt(t2, 16);
    const t22 = t20 > 100 ? -(256 - t20) : t20;
    const t3 = t.substring(4, 6);
    const t30 = parseInt(t3, 16);
    const t33 = t30 > 100 ? -(256 - t30) : t30;

    // eslint-disable-next-line prettier/prettier
    const tC =
      SensorSet3 === 'air_flour_12'
        ? (t11 + t22 + t33) / 3
        : SensorSet3 === 'air_flour_1'
          ? (t11 + t33) / 2
          : SensorSet3 === 'air_flour_2'
            ? (t22 + t33) / 2
            : SensorSet3 === 'flour_12'
              ? (t11 + t22) / 2
              : SensorSet3 === 'air'
                ? t33
                : SensorSet3 === 'flour_1'
                  ? t11
                  : SensorSet3 === 'flour_2'
                    ? t22
                    : '!';

    return (
      <View>
        <SafeAreaView style={styles.container}>
          <View style={styles.areaAir}>
            <Text style={styles.titlekwh}>{Strings.getLang('climateTemp')}</Text>
            <View style={styles.air}>
              <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} marginRight={7} />
              <Text style={styles.num}>
                {FaultAlarm === 0 ? Math.round(tC) : '--'}
                °C
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <View style={styles.areaPWR}>
            {chSelector === false ? (
              <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={25} margin={10} />
            ) : (
              <FontAwesomeIcon icon={faFireAlt} color="#ffb700" size={25} margin={10} />
            )}
            <Text style={styles.titlekwh}>{Strings.getLang('status')}</Text>
            <Text style={styles.num}>
              {Relay1flag === true ? Strings.getLang('on') : Strings.getLang('off')}
            </Text>
            <View>
              <Text style={styles.titlekwh}>
                {RelayPower1} 
                {Strings.getLang('kwh')}
              </Text>
            </View>
          </View>
          <View style={styles.areaPWR}>
            {chSelector === true ? (
              <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={25} margin={10} />
            ) : (
              <FontAwesomeIcon icon={faFireAlt} color="#ffb700" size={25} margin={10} />
            )}
            <Text style={styles.titlekwh}>{Strings.getLang('status')}</Text>
            <Text style={styles.num}>
              {Relay2flag === true ? Strings.getLang('on') : Strings.getLang('off')}
            </Text>
            <View>
              <Text style={styles.titlekwh}>
                {RelayPower2} 
                {Strings.getLang('kwh')}
              </Text>
            </View>
          </View>
          {FaultAlarm === 0 ? null : FaultAlarm === 4 ? null : FaultAlarm === 8 ? null : (
            <View style={styles.areaPWR}>
              <FontAwesomeIcon icon={faExclamationTriangle} color="#ff3b00" size={25} margin={10} />
              <Text style={styles.num}>{Strings.getLang('alarma')}</Text>
              {/* <Text style={styles.num}>E{FaultAlarm}</Text> */}
              <View>
                <Text style={styles.title}>{Strings.getLang('sen_err')}</Text>
                <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
              </View>
            </View>
          )}
          {FaultAlarm === 0 ? null : FaultAlarm === 1 ? null : FaultAlarm === 2 ? null : (
            <View style={styles.areaPWR}>
              <FontAwesomeIcon icon={faExclamationTriangle} color="#ff3b00" size={25} margin={10} />
              <Text style={styles.num}>{Strings.getLang('alarma')}</Text>
              {/* <Text style={styles.num}>E{FaultAlarm}</Text> */}
              <View>
                <Text style={styles.title}>{Strings.getLang('sen_err')}</Text>
                <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
    );
  }
}

ClimateReport.propTypes = {
  chSelector: PropTypes.bool,
  Relay1flag: PropTypes.bool,
  Relay2flag: PropTypes.bool,
  RelayPower1: PropTypes.number,
  RelayPower2: PropTypes.number,
  FaultAlarm: PropTypes.number,
  SensorSet3: PropTypes.string,
  ReportTemperature: PropTypes.string,
};

ClimateReport.defaultProps = {
  chSelector: false,
  Relay1flag: false,
  Relay2flag: true,
  RelayPower1: 0,
  RelayPower2: 0,
  FaultAlarm: 0,
  SensorSet3: 'air_flour_12',
  ReportTemperature: '112233',
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  // area: {
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#fff',
  //   borderRadius: 12,
  //   margin: 5,
  //   width: 80,
  //   height: 130,
  // },
  areaAir: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: 350,
    height: 60,
  },
  areaPWR: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: 170,
    height: 118,
  },
  num: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  air: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  titlekwh: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    marginBottom: 5,
  },
  titleE: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    marginBottom: 5,
  },
  // titleE2: {
  //   textAlign: 'center',
  //   fontWeight: '200',
  //   fontSize: 8,
  //   color: 'black',
  //   justifyContent: 'center',
  //   marginBottom: 5,
  // },
});

export default connect(({ dpState }) => ({
  chSelector: dpState[chSelectorCode],
  Relay1flag: dpState[Relay1flagCode],
  Relay2flag: dpState[Relay2flagCode],
  RelayPower1: dpState[RelayPower1Code],
  RelayPower2: dpState[RelayPower2Code],
  FaultAlarm: dpState[FaultAlarmCode],
  ReportTemperature: dpState[ReportTemperatureCode],
  SensorSet3: dpState[SensorSet3Code],
}))(ClimateReport);
