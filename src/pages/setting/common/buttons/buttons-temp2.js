/* eslint-disable react/destructuring-assignment */
// настройка температур для 2 кнопки
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Slider, Divider, Stepper, TYSdk, TYText } from 'tuya-panel-kit';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import Strings from '../../../../i18n/index.ts';
import dpCodes from '../../../../config/dpCodes.ts';

const TYDevice = TYSdk.device;

const { PresetTemperature: PresetTemperatureCode } = dpCodes;

const tonePress = Strings.getLang('tonePress');
const ttwoPress = Strings.getLang('ttwoPress');
const tthreePress = Strings.getLang('tthreePress');

class ButtonsTemp2S extends Component {
  constructor(props) {
    super(props);
    // const iT = this.props.PresetTemperature.match(/(..?)/g);
    const T = this.props.PresetTemperature;
    const t1 = parseInt(T.substring(10, 12), 16);
    const t2 = parseInt(T.substring(8, 10), 16);
    const t3 = parseInt(T.substring(6, 8), 16);
    this.state = {
      value1: t1 > 100 ? t1 - 256 : t1,
      value2: t2 > 100 ? t2 - 256 : t2,
      value3: t3 > 100 ? t3 - 256 : t3,
    };
  }

  // функция выбора 1 значения (с округлением до целого числа)
  _handleComplete1 = value1 => {
    this.setState({ value1: Math.round(value1) });
    const I = this.props.PresetTemperature.substring(0, 10);
    const II = this.props.PresetTemperature.substring(12, 18);
    const Tset = Math.round(value1);
    // плявит
    const Tsend = Tset.toString(16);
    const ZorroOne = '0';
    const Tfin = Tset < 16 ? String(I + ZorroOne + Tsend + II) : String(I + Tsend + II);
    // не плявит, ибо 0
    const Zorro = '00';
    const Tfin0 = String(I + Zorro + II);
    // плявит обратно, ибо не 0 и не плявит
    const Tminus = 256 + Tset;
    const TsendMinus = Tminus.toString(16);
    const TfinMin = String(I + TsendMinus + II);
    // eslint-disable-next-line no-unused-expressions
    Tset > 0
      ? TYDevice.putDeviceData({
        [PresetTemperatureCode]: Tfin,
      })
      : Tset === 0
        ? TYDevice.putDeviceData({
          [PresetTemperatureCode]: Tfin0,
        })
        : Tset < 0
          ? TYDevice.putDeviceData({
            [PresetTemperatureCode]: TfinMin,
          })
          : null;
  };

  // функция выбора 2 значения
  _handleComplete2 = value2 => {
    this.setState({ value2: Math.round(value2) });
    const I = this.props.PresetTemperature.substring(0, 8);
    const II = this.props.PresetTemperature.substring(10, 18);
    const Tset = Math.round(value2);
    // плявит
    const Tsend = Tset.toString(16);
    const ZorroOne = '0';
    const Tfin = Tset < 16 ? String(I + ZorroOne + Tsend + II) : String(I + Tsend + II);
    // не плявит, ибо 0
    const Zorro = '00';
    const Tfin0 = String(I + Zorro + II);
    // плявит обратно, ибо не 0 и не плявит
    const Tminus = 256 + Tset;
    const TsendMinus = Tminus.toString(16);
    const TfinMin = String(I + TsendMinus + II);
    // eslint-disable-next-line no-unused-expressions
    Tset > 0
      ? TYDevice.putDeviceData({
        [PresetTemperatureCode]: Tfin,
      })
      : Tset === 0
        ? TYDevice.putDeviceData({
          [PresetTemperatureCode]: Tfin0,
        })
        : Tset < 0
          ? TYDevice.putDeviceData({
            [PresetTemperatureCode]: TfinMin,
          })
          : null;
  };

  // функция выбора 3 значения
  _handleComplete3 = value3 => {
    this.setState({ value3: Math.round(value3) });
    const I = this.props.PresetTemperature.substring(0, 6);
    const II = this.props.PresetTemperature.substring(8, 18);
    const Tset = Math.round(value3);
    // плявит
    const Tsend = Tset.toString(16);
    const ZorroOne = '0';
    const Tfin = Tset < 16 ? String(I + ZorroOne + Tsend + II) : String(I + Tsend + II);
    // не плявит, ибо 0
    const Zorro = '00';
    const Tfin0 = String(I + Zorro + II);
    // плявит обратно, ибо не 0 и не плявит
    const Tminus = 256 + Tset;
    const TsendMinus = Tminus.toString(16);
    const TfinMin = String(I + TsendMinus + II);
    // eslint-disable-next-line no-unused-expressions
    Tset > 0
      ? TYDevice.putDeviceData({
        [PresetTemperatureCode]: Tfin,
      })
      : Tset === 0
        ? TYDevice.putDeviceData({
          [PresetTemperatureCode]: Tfin0,
        })
        : Tset < 0
          ? TYDevice.putDeviceData({
            [PresetTemperatureCode]: TfinMin,
          })
          : null;
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 0.5,
          marginTop: 10,
        }}
      >
        <View style={styles.title}>
          <FontAwesomeIcon icon={faTemperatureLow} color="#ff7300" size={25} />
        </View>
        <TYText style={styles.buttontext}>
          {this.state.value1}
          °C
          {tonePress}
        </TYText>
        <View style={styles.title}>
          <TYText style={styles.context}>-15</TYText>
          <Slider.Horizontal
            disabled={(this.state.value2 - -15) === 1}
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value2 - 1}
            minimumValue={-15}
            value={this.state.value1}
            stepValue={1}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ff7300"
            onValueChange={value1 => this.setState({ value1: Math.round(value1) })}
            onSlidingComplete={this._handleComplete1}
          />
          <TYText style={styles.context}> {this.state.value2}</TYText>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ff7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={this._handleComplete1}
          max={this.state.value2 - 1}
          stepValue={1}
          min={-15}
          value={this.state.value1}
        />
        <Divider />
        <TYText style={styles.buttontext}>
          {this.state.value2}
          °C
          {ttwoPress}
        </TYText>
        <View style={styles.title}>
          <TYText style={styles.context}>{this.state.value1}</TYText>
          <Slider.Horizontal
            disabled={(this.state.value3 - this.state.value1) === 2}
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={this.state.value3 - 1}
            stepValue={1}
            minimumValue={this.state.value1 + 1}
            value={this.state.value2}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ff7300"
            onValueChange={value2 => this.setState({ value2: Math.round(value2) })}
            onSlidingComplete={this._handleComplete2}
          />
          <TYText style={styles.context}> {this.state.value3}</TYText>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ff7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={this._handleComplete2}
          max={this.state.value3 - 1}
          stepValue={1}
          min={this.state.value1 + 1}
          value={this.state.value2}
        />
        <Divider />
        <TYText style={styles.buttontext}>
          {this.state.value3}
          °C
          {tthreePress}
        </TYText>
        <View style={styles.title}>
          <TYText style={styles.context}>{this.state.value2}</TYText>
          <Slider.Horizontal
            disabled={(80 - this.state.value2) === 1}
            style={styles.slider}
            canTouchTrack={true}
            maximumValue={80}
            stepValue={1}
            minimumValue={this.state.value2 + 1}
            value={this.state.value3}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#ff7300"
            onValueChange={value3 => this.setState({ value3: Math.round(value3) })}
            onSlidingComplete={this._handleComplete3}
          />
          <TYText style={styles.context}> 80</TYText>
        </View>
        <Stepper
          buttonType="ellipse"
          buttonStyle={{ size: 'small' }}
          ellipseIconColor="#ff7300"
          style={styles.stepper}
          inputStyle={{ color: 'transparent' }}
          editable={false}
          onValueChange={this._handleComplete3}
          max={80}
          stepValue={1}
          min={this.state.value2 + 1}
          value={this.state.value3}
        />
      </ScrollView>
    );
  }
}

ButtonsTemp2S.propTypes = {
  PresetTemperature: PropTypes.string,
};

ButtonsTemp2S.defaultProps = {
  PresetTemperature: '23180c1c180c1c180c',
};

const styles = StyleSheet.create({
  buttontext: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 3,
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  context: {
    fontSize: 10,
    fontWeight: '200',
    color: 'black',
    paddingRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  stepper: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 15,
  },
});

export default connect(({ dpState }) => ({
  PresetTemperature: dpState[PresetTemperatureCode],
}))(ButtonsTemp2S);
