/* eslint-disable react/destructuring-assignment */
// отображение всех элементов типа (report only) в режиме климат-контроля
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faExclamationTriangle,
  faThermometerEmpty,
  faSnowflake,
  faSun,
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

const windowHeight = Dimensions.get('window').height < 700 ? 'small' : 'normal';

class ClimateReport extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { chSelector, Relay1flag, Relay2flag, RelayPower1, RelayPower2, FaultAlarm, SensorSet3 } =
      this.props;

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

    return windowHeight === 'normal' ? (
      <View>
        {FaultAlarm !== 0 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaAir}>
              <TYText style={[styles.titlekwh, { fontSize: 20 }]}>
                {Strings.getLang('climateTemp')}
              </TYText>
              <View style={styles.air}>
                <FontAwesomeIcon icon={faThermometerEmpty} color="#fff" size={25} marginRight={7} />
                <TYText style={[styles.num, { fontSize: 26 }]}>
                  {FaultAlarm === 0 ? Math.round(tC) : '--'}
                  °C
                </TYText>
              </View>
            </View>
          </SafeAreaView>
        )}
        {FaultAlarm !== 0 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaPWR}>
              {chSelector === false ? (
                <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={25} marginTop={8} />
              ) : (
                <FontAwesomeIcon icon={faSun} color="#ffb700" size={25} marginTop={8} />
              )}
              <TYText style={styles.num}>
                {Relay1flag === true
                  ? Strings.getLang(chSelector === false ? 'oncool' : 'on')
                  : Strings.getLang('off')}
              </TYText>
              <View>
                <TYText style={styles.titlekwh}>
                  {RelayPower1 / 10} 
                  {' '}
                  {Strings.getLang('kwh')}
                </TYText>
              </View>
            </View>
            <View style={styles.areaPWR}>
              {chSelector === true ? (
                <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={25} marginTop={8} />
              ) : (
                <FontAwesomeIcon icon={faSun} color="#ffb700" size={25} marginTop={8} />
              )}
              <TYText style={styles.num}>
                {Relay2flag === true
                  ? Strings.getLang(chSelector === true ? 'oncool' : 'on')
                  : Strings.getLang('off')}
              </TYText>
              <View>
                <TYText style={styles.titlekwh}>
                  {RelayPower2 / 10} 
                  {' '}
                  {Strings.getLang('kwh')}
                </TYText>
              </View>
            </View>
          </SafeAreaView>
        )}
        {FaultAlarm === 0 ? null : FaultAlarm === 4 ? null : FaultAlarm === 8 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaPWRA}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                color="#ff3b00"
                size={35}
                marginTop={8}
              />
              <TYText style={styles.num}>{Strings.getLang('alarma')}</TYText>
              <TYText style={styles.num}>
                {`${Strings.getLang('sen_err')} ${Strings.getLang('zone1')}`}
              </TYText>
            </View>
          </SafeAreaView>
        )}
        {FaultAlarm === 0 ? null : FaultAlarm === 1 ? null : FaultAlarm === 2 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaPWRA}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                color="#ff3b00"
                size={35}
                marginTop={8}
              />
              <TYText style={styles.num}>{Strings.getLang('alarma')}</TYText>
              <TYText style={styles.num}>
                {`${Strings.getLang('sen_err')} ${Strings.getLang('zone2')}`}
              </TYText>
            </View>
          </SafeAreaView>
        )}
      </View>
    ) : (
      <View>
        {FaultAlarm !== 0 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaAir}>
              <TYText style={[styles.titlekwh, { fontSize: windowHeight === 'normal' ? 20 : 15 }]}>
                {Strings.getLang('climateTemp')}
              </TYText>
              <View style={styles.air}>
                <FontAwesomeIcon icon={faThermometerEmpty} color="#fff" size={15} marginRight={7} />
                <TYText style={[styles.num, { fontSize: windowHeight === 'normal' ? 26 : 18}]}>
                  {FaultAlarm === 0 ? Math.round(tC) : '--'}
                  °C
                </TYText>
              </View>
            </View>
          </SafeAreaView>
        )}
        {FaultAlarm !== 0 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaPWR}>
              {chSelector === false ? (
                <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={15} marginTop={5} />
              ) : (
                <FontAwesomeIcon icon={faSun} color="#ffb700" size={15} marginTop={5} />
              )}
              <TYText style={styles.num}>
                {Relay1flag === true
                  ? Strings.getLang(chSelector === false ? 'oncool' : 'on')
                  : Strings.getLang('off')}
              </TYText>
              <View>
                <TYText style={styles.titlekwh}>
                  {RelayPower1 / 10} 
                  {' '}
                  {Strings.getLang('kwh')}
                </TYText>
              </View>
            </View>
            <View style={styles.areaPWR}>
              {chSelector === true ? (
                <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={15} marginTop={5} />
              ) : (
                <FontAwesomeIcon icon={faSun} color="#ffb700" size={15} marginTop={5} />
              )}
              <TYText style={styles.num}>
                {Relay2flag === true
                  ? Strings.getLang(chSelector === true ? 'oncool' : 'on')
                  : Strings.getLang('off')}
              </TYText>
              <View>
                <TYText style={styles.titlekwh}>
                  {RelayPower2 / 10} 
                  {' '}
                  {Strings.getLang('kwh')}
                </TYText>
              </View>
            </View>
          </SafeAreaView>
        )}
        {FaultAlarm === 0 ? null : FaultAlarm === 4 ? null : FaultAlarm === 8 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaPWRA}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                color="#ff3b00"
                size={15}
                marginTop={5}
              />
              <TYText style={styles.num}>{Strings.getLang('alarma')}</TYText>
              <TYText style={styles.num}>
                {`${Strings.getLang('sen_err')} ${Strings.getLang('zone1')}`}
              </TYText>
            </View>
          </SafeAreaView>
        )}
        {FaultAlarm === 0 ? null : FaultAlarm === 1 ? null : FaultAlarm === 2 ? null : (
          <SafeAreaView style={styles.container}>
            <View style={styles.areaPWRA}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                color="#ff3b00"
                size={15}
                marginTop={5}
              />
              <TYText style={styles.num}>{Strings.getLang('alarma')}</TYText>
              <TYText style={styles.num}>
                {`${Strings.getLang('sen_err')} ${Strings.getLang('zone2')}`}
              </TYText>
            </View>
          </SafeAreaView>
        )}
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
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  areaAir: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '90%',
    padding: 5,
  },
  areaPWR: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '44%',
    height: windowHeight === 'normal' ? 90 : 70,
  },
  areaPWRA: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: '44%',
    height: windowHeight === 'normal' ? 130 : 100,
  },
  num: {
    textAlign: 'center',
    fontSize: windowHeight === 'normal' ? 20 : 18,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  air: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  titlekwh: {
    textAlign: 'center',
    color: '#949494',
    justifyContent: 'center',
    marginBottom: 5,
  },
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
