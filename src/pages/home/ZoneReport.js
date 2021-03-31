/* eslint-disable react/destructuring-assignment */
// отображение всех элементов типа (report only) в многозонном режиме
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faMapMarkerAlt,
  faBacon,
  faDoorOpen,
  faExclamationTriangle,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../i18n/index.ts';
import dpCodes from '../../config/dpCodes.ts';

const {
  Relay1flag: Relay1flagCode,
  Relay2flag: Relay2flagCode,
  RelayPower1: RelayPower1Code,
  RelayPower2: RelayPower2Code,
  OpenWindowStatus: OpenWindowStatusCode,
  FaultAlarm: FaultAlarmCode,
  ReportTemperature: ReportTemperatureCode,
  SensorSet1: SensorSet1Code,
  SensorSet2: SensorSet2Code,
} = dpCodes;

class ZoneReport extends React.PureComponent {
  // в состояние вписываются значения datapoints,
  // от которых будет зависеть отображается тот или иной компонент
  constructor(props) {
    super(props);
    this.state = {};
    this.stateA = { isHidden: true };
    this.stateZ1 = { isHidden: true }; // true - показывает компоненту, false - прятает
    this.stateZ2 = { isHidden: true };
  }

  render() {
    const {
      Relay1flag,
      Relay2flag,
      RelayPower1,
      RelayPower2,
      OpenWindowStatus,
      FaultAlarm,
      SensorSet1,
      SensorSet2,
    } = this.props;

    const t = this.props.ReportTemperature;
    const t1 = t.substring(0, 2);
    const t10 = parseInt(t1, 16);
    const t11 = SensorSet1 === 'air' ? '--' : t10 > 100 ? -(256 - t10) : t10;
    const t2 = t.substring(2, 4);
    const t20 = parseInt(t2, 16);
    const t22 = SensorSet2 === 'air' ? '--' : t20 > 100 ? -(256 - t20) : t20;
    const t3 = t.substring(4, 6);
    const t30 = parseInt(t3, 16);
    const t33 = t30 > 100 ? -(256 - t30) : t30;

    return (
      <View>
        <SafeAreaView style={styles.container}>
          {SensorSet1 === 'flour' && SensorSet2 === 'flour' ? null : (
            <View style={styles.areaAir}>
              <Text style={styles.titleE}>{Strings.getLang('airtemp')}</Text>
              <View style={styles.air}>
                <FontAwesomeIcon icon={faBacon} color="#00d0ff" size={20} marginRight={10} />
                <Text style={styles.num}>
                  {t33}
                  °C
                </Text>
              </View>
            </View>
          )}
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          {this.stateZ1.isHidden ? (
            <View style={styles.area}>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={25} margin={10} />
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
              <Text style={styles.num}>
                {FaultAlarm === 0 ? t11 : FaultAlarm === 4 ? t11 : FaultAlarm === 8 ? t11 : '--'}
                °C
              </Text>
              <View>
                <Text style={styles.titleE}>{Strings.getLang('now_temp')}</Text>
              </View>
            </View>
          ) : null}
          <View style={styles.area}>
            <FontAwesomeIcon icon={faLightbulb} color="#ffb700" size={25} margin={10} />
            <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            <Text style={styles.num}>
              {Relay1flag === true ? Strings.getLang('on') : Strings.getLang('off')}
            </Text>
            <View>
              <Text style={styles.titleE}>
                {RelayPower1} 
                {Strings.getLang('kwh')}
              </Text>
            </View>
          </View>
          {this.stateZ2.isHidden ? (
            <View style={styles.area}>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={25} margin={10} />
              <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
              <Text style={styles.num}>
                {FaultAlarm === 0 ? t22 : FaultAlarm === 1 ? t22 : FaultAlarm === 2 ? t22 : '--'}
                °C
              </Text>
              <View>
                <Text style={styles.titleE}>{Strings.getLang('now_temp')}</Text>
              </View>
            </View>
          ) : null}
          <View style={styles.area}>
            <FontAwesomeIcon icon={faLightbulb} color="#ff7300" size={25} margin={10} />
            <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
            <Text style={styles.num}>
              {Relay2flag === true ? Strings.getLang('on') : Strings.getLang('off')}
            </Text>
            <View>
              <Text style={styles.titleE}>
                {RelayPower2} 
                {Strings.getLang('kwh')}
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          {OpenWindowStatus === 0 ? null : (
            <View style={styles.areaWindow}>
              <Text style={styles.titleWWW}>{Strings.getLang('wintitle')}</Text>
              <View style={styles.air}>
                <FontAwesomeIcon icon={faDoorOpen} color="#00e1ff" size={25} marginRight={10} />
                <Text style={styles.num}>{OpenWindowStatus}</Text>
              </View>
              <Text style={styles.titleE}>{Strings.getLang('wintime')}</Text>
              <View>{/* <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text> */}</View>
            </View>
          )}
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          {FaultAlarm === 0 ? null : FaultAlarm === 4 ? null : FaultAlarm === 8 ? null : (
            <View style={styles.areaERR}>
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
            <View style={styles.areaERR}>
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

ZoneReport.propTypes = {
  Relay1flag: PropTypes.bool,
  Relay2flag: PropTypes.bool,
  RelayPower1: PropTypes.number,
  RelayPower2: PropTypes.number,
  OpenWindowStatus: PropTypes.number,
  FaultAlarm: PropTypes.number,
  ReportTemperature: PropTypes.string,
  SensorSet1: PropTypes.string,
  SensorSet2: PropTypes.string,
};

ZoneReport.defaultProps = {
  Relay1flag: false,
  Relay2flag: true,
  RelayPower1: 0,
  RelayPower2: 0,
  OpenWindowStatus: 0,
  FaultAlarm: 0,
  ReportTemperature: '112233',
  SensorSet1: 'air_flour',
  SensorSet2: 'air_flour',
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  area: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: 80,
    height: 130,
  },
  areaAir: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: 350,
    height: 50,
  },
  areaWindow: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    width: 350,
    height: 80,
  },
  areaERR: {
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
  },
  air: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlekwh: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
  },
  titleWWW: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    marginTop: 5,
  },
  titleE: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 10,
    color: 'black',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default connect(({ dpState }) => ({
  Relay1flag: dpState[Relay1flagCode],
  Relay2flag: dpState[Relay2flagCode],
  RelayPower1: dpState[RelayPower1Code],
  RelayPower2: dpState[RelayPower2Code],
  OpenWindowStatus: dpState[OpenWindowStatusCode],
  FaultAlarm: dpState[FaultAlarmCode],
  ReportTemperature: dpState[ReportTemperatureCode],
  SensorSet1: dpState[SensorSet1Code],
  SensorSet2: dpState[SensorSet2Code],
}))(ZoneReport);
