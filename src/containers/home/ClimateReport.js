// отображение всех элементов типа (report only) в режиме климат-контроля
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTemperatureLow,
  faExclamationTriangle,
  faSeedling,
  faSnowflake,
  faFireAlt,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../i18n';
import dpCodes from '../../config/dpCodes';

const {
  chSelector: chSelectorCode,
  Relay1flag: Relay1flagCode,
  Relay2flag: Relay2flagCode,
} = dpCodes;

class ClimateReport extends React.PureComponent {
  static propTypes = {
    chSelector: PropTypes.bool,
    Relay1flag: PropTypes.bool,
    Relay2flag: PropTypes.bool,
  };

  static defaultProps = {
    chSelector: false,
    Relay1flag: false,
    Relay2flag: true,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.stateE1 = { isHidden: false };
    this.stateE2 = { isHidden: false };
  }
  render() {
    const { chSelector, Relay1flag, Relay2flag } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.areaAir}>
          <View style={styles.air}>
            <FontAwesomeIcon
              icon={faTemperatureLow}
              color="#90EE90"
              size={10}
              marginBottom={5}
              marginRight={5}
            />
            <Text style={styles.titlekwh}>20°C</Text>
          </View>
          <Text style={styles.titleE2}>{Strings.getLang('climateSetTemp')}</Text>
          <View style={styles.air}>
            <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} marginRight={7} />
            <Text style={styles.num}>30°C</Text>
          </View>
          <Text style={styles.titleE}>{Strings.getLang('climateTemp')}</Text>
        </View>
        <View style={styles.areaPWR}>
          {chSelector === false ? (
            <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={25} margin={10} />
          ) : (
            <FontAwesomeIcon icon={faFireAlt} color="#ffb700" size={25} margin={10} />
          )}
          <Text style={styles.titlekwh}>{Strings.getLang('status')}</Text>
          {Relay1flag === true ? (
            <Text style={styles.num}>{Strings.getLang('on')}</Text>
          ) : (
            <Text style={styles.num}>{Strings.getLang('off')}</Text>
          )}
          <View>
            <Text style={styles.titlekwh}>1250 {Strings.getLang('kwh')}</Text>
          </View>
        </View>
        <View style={styles.areaPWR}>
          {chSelector === true ? (
            <FontAwesomeIcon icon={faSnowflake} color="#00d0ff" size={25} margin={10} />
          ) : (
            <FontAwesomeIcon icon={faFireAlt} color="#ffb700" size={25} margin={10} />
          )}
          <Text style={styles.titlekwh}>{Strings.getLang('status')}</Text>
          {Relay2flag === true ? (
            <Text style={styles.num}>{Strings.getLang('on')}</Text>
          ) : (
            <Text style={styles.num}>{Strings.getLang('off')}</Text>
          )}
          <View>
            <Text style={styles.titlekwh}>1250 {Strings.getLang('kwh')}</Text>
          </View>
        </View>
        {this.stateE1.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faExclamationTriangle} color="#ff3b00" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('alarma')}</Text>
            <Text style={styles.num}>☠</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('sen_err')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            </View>
          </View>
        ) : null}
        {this.stateE2.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faExclamationTriangle} color="#ff3b00" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('alarma')}</Text>
            <Text style={styles.num}>☠</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('sen_err')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
            </View>
          </View>
        ) : null}
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
    height: 100,
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
  titleE2: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 8,
    color: 'black',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default connect(({ dpState }) => ({
  chSelector: dpState[chSelectorCode],
  Relay1flag: dpState[Relay1flagCode],
  Relay2flag: dpState[Relay2flagCode],
}))(ClimateReport);
