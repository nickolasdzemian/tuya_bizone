// отображение всех элементов типа (report only)
import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faMapMarkerAlt,
  faBacon,
  faDoorOpen,
  faExclamationTriangle,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import Strings from '../../i18n';

export default class MainReport extends React.PureComponent {
  // в состояние данного конструктора вписываются значения datapoints,
  // от которых будет зависеть отображается тот или иной компонент
  // работает без DOM, отрисовка максимально быстрый
  constructor(props) {
    super(props);
    // if (this.datapoint.state) - условие
    this.stateA = { isHidden: true };
    this.stateZ1 = { isHidden: true }; // true - показывает компоненту, false - прятает
    this.stateZ2 = { isHidden: true };
    this.stateR1 = { isHidden: true };
    this.stateR2 = { isHidden: true };
    this.stateW1 = { isHidden: false };
    this.stateW2 = { isHidden: false };
    this.stateE1 = { isHidden: false };
    this.stateE2 = { isHidden: false };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView
      horizontal={true}
      indicatorStyle="white"
      pinchGestureEnabled={true}
      scrollBarThumbImage="#fff"
    > */}
        {this.stateA.isHidden ? (
          <View style={styles.areaAir}>
            <View style={styles.air}>
              <FontAwesomeIcon icon={faBacon} color="#00d0ff" size={20} marginRight={5} />
              <Text style={styles.num}>30°C</Text>
            </View>
            <Text style={styles.titleE}>{Strings.getLang('airtemp')}</Text>
          </View>
        ) : null}
        {this.stateZ1.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#ffb700" size={25} margin={10} />
            <Text style={styles.titlekwh}>20°C</Text>
            <Text style={styles.num}>10°C</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('now_temp')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.area}>
          <FontAwesomeIcon icon={faLightbulb} color="#ffb700" size={25} margin={10} />
          <Text style={styles.titlekwh}>{Strings.getLang('pwr')}</Text>
          {this.stateR1.isHidden ? (
            <Text style={styles.num}>{Strings.getLang('on')}</Text>
          ) : (
            <Text style={styles.num}>{Strings.getLang('off')}</Text>
          )}
          <View>
            <Text style={styles.titlekwh}>1250 {Strings.getLang('kwh')}</Text>
            <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
          </View>
        </View>
        {this.stateZ2.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#ff7300" size={25} margin={10} />
            <Text style={styles.titlekwh}>30°C</Text>
            <Text style={styles.num}>20°C</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('now_temp')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.area}>
          <FontAwesomeIcon icon={faLightbulb} color="#ff7300" size={25} margin={10} />
          <Text style={styles.titlekwh}>{Strings.getLang('pwr')}</Text>
          {this.stateR2.isHidden ? (
            <Text style={styles.num}>{Strings.getLang('on')}</Text>
          ) : (
            <Text style={styles.num}>{Strings.getLang('off')}</Text>
          )}
          <View>
            <Text style={styles.titlekwh}>666 {Strings.getLang('kwh')}</Text>
            <Text style={styles.titleE}>{Strings.getLang('zone2')}</Text>
          </View>
        </View>
        {this.stateW1.isHidden ? (
          <View style={styles.area}>
            <FontAwesomeIcon icon={faDoorOpen} color="#00e1ff" size={25} margin={10} />
            <Text style={styles.titlekwh}>{Strings.getLang('wintitle')}</Text>
            <Text style={styles.num}>29</Text>
            <View>
              <Text style={styles.title}>{Strings.getLang('wintime')}</Text>
              <Text style={styles.titleE}>{Strings.getLang('zone1')}</Text>
            </View>
          </View>
        ) : null}
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
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    width: '90%',
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
