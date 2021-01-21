// отображение всех элементов типа (report only) в многозонном режиме
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faMapMarkerAlt,
  faBacon,
  faDoorOpen,
  faExclamationTriangle,
  faLightbulb,
  faBorderNone,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../i18n';
import dpCodes from '../../config/dpCodes';

const {
  Relay1flag: Relay1flagCode,
  Relay2flag: Relay2flagCode,
  RelayPower1: RelayPower1Code,
  RelayPower2: RelayPower2Code,
  OpenWindowStatus: OpenWindowStatusCode,
  FaultAlarm: FaultAlarmCode,
  ReportTemperature: ReportTemperatureCode,
} = dpCodes;

class ZoneReport extends React.PureComponent {
  static propTypes = {
    Relay1flag: PropTypes.bool,
    Relay2flag: PropTypes.bool,
    RelayPower1: PropTypes.number,
    RelayPower2: PropTypes.number,
    OpenWindowStatus: PropTypes.number,
    FaultAlarm: PropTypes.number,
    ReportTemperature: PropTypes.string,
  };

  static defaultProps = {
    Relay1flag: false,
    Relay2flag: true,
    RelayPower1: 0,
    RelayPower2: 0,
    OpenWindowStatus: 0,
    FaultAlarm: 0,
    ReportTemperature: '112233',
  };
  // в состояние вписываются значения datapoints,
  // от которых будет зависеть отображается тот или иной компонент
  constructor(props) {
    super(props);
    this.state = {};
    this.stateA = { isHidden: true };
    this.stateZ1 = { isHidden: true }; // true - показывает компоненту, false - прятает
    this.stateZ2 = { isHidden: true };
    this.stateW1 = { isHidden: false };
    this.stateW2 = { isHidden: false };
    this.stateE1 = { isHidden: false };
    this.stateE2 = { isHidden: false };
  }

  render() {
    const {
      Relay1flag,
      Relay2flag,
      RelayPower1,
      RelayPower2,
      OpenWindowStatus,
      FaultAlarm,
      ReportTemperature,
    } = this.props;
    // const t = parseInt(ReportTemperature, 16);
    const t = this.props.ReportTemperature;
    console.log(t, 't');
    const t1 = t.substring(0, 2);
    console.log(t1, 't1');
    const t10 = parseInt(t1, 16);
    console.log(t10, 't10');
    const t2 = t.substring(2, 4);
    console.log(t2, 't2');
    const t20 = parseInt(t2, 16);
    console.log(t20, 't20');
    const t3 = t.substring(4, 6);
    console.log(t3, 't3');
    const t30 = parseInt(t3, 16);
    console.log(t30, 't30');
    return (
      <SafeAreaView style={styles.container}>
        {this.stateA.isHidden ? (
          <View style={styles.areaAir}>
            <View style={styles.air}>
              <FontAwesomeIcon icon={faBacon} color="#00d0ff" size={20} marginRight={5} />
              <Text style={styles.num}>{t30}</Text>
            </View>
            <Text style={styles.titleE}>{Strings.getLang('airtemp')}</Text>
          </View>
        ) : null}
        {this.stateZ1.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={25} margin={10} />
            <Text style={styles.titlekwh}>20°C</Text>
            <Text style={styles.num}>{t10}</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('now_temp')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.area}>
          <FontAwesomeIcon icon={faLightbulb} color="#ffb700" size={25} margin={10} />
          <Text style={styles.titlekwh}>{Strings.getLang('status')}</Text>
          {Relay1flag === true ? (
            <Text style={styles.num}>{Strings.getLang('on')}</Text>
          ) : (
            <Text style={styles.num}>{Strings.getLang('off')}</Text>
          )}
          <View>
            <Text style={styles.titlekwh}>
              {RelayPower1} {Strings.getLang('kwh')}
            </Text>
            <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
          </View>
        </View>
        {this.stateZ2.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={25} margin={10} />
            <Text style={styles.titlekwh}>30°C</Text>
            <Text style={styles.num}>{t20}</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('now_temp')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.area}>
          <FontAwesomeIcon icon={faLightbulb} color="#ff7300" size={25} margin={10} />
          <Text style={styles.titlekwh}>{Strings.getLang('status')}</Text>
          {Relay2flag === true ? (
            <Text style={styles.num}>{Strings.getLang('on')}</Text>
          ) : (
            <Text style={styles.num}>{Strings.getLang('off')}</Text>
          )}
          <View>
            <Text style={styles.titlekwh}>
              {RelayPower2} {Strings.getLang('kwh')}
            </Text>
            <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
          </View>
        </View>
        {OpenWindowStatus === 0 ? null : (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#00e1ff" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('wintitle')}</Text>
            <Text style={styles.num}>{OpenWindowStatus}</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('wintime')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            </View>
          </View>
        )}
        {this.stateW2.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#00d0ff" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('wintitle')}</Text>
            <Text style={styles.num}>18</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('wintime')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
            </View>
          </View>
        ) : null}
        {FaultAlarm === 0 ? null : FaultAlarm === 4 ? null : FaultAlarm === 8 ? null : (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faExclamationTriangle} color="#ff3b00" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('alarma')}</Text>
            <Text style={styles.num}>E{FaultAlarm}</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('sen_err')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            </View>
          </View>
        )}
        {FaultAlarm === 0 ? null : FaultAlarm === 1 ? null : FaultAlarm === 2 ? null : (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faExclamationTriangle} color="#ff3b00" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('alarma')}</Text>
            <Text style={styles.num}>E{FaultAlarm}</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('sen_err')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

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
}))(ZoneReport);