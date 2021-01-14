// /* eslint-disable global-require */
// // основной код климата
// import PropTypes from 'prop-types';
// import React from 'react';
// import { connect } from 'react-redux';
// import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
// import { SwitchButton, TYSdk } from 'tuya-panel-kit';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faSeedling } from '@fortawesome/free-solid-svg-icons';
// import Strings from '../../../i18n';
// import dpCodes from '../../../config/dpCodes';

// const TYDevice = TYSdk.device;

// const { chSelector: chSelectorCode } = dpCodes;

// // включение режима климата и переключение режима каналов
// class ClimateChScene extends React.PureComponent {
//   static propTypes = {
//     chSelector: PropTypes.bool,
//   };

//   static defaultProps = {
//     chSelector: false,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   getDataSelector() {
//     const { chSelector } = this.props;
//     console.log('ClimateCH', chSelector);
//     return chSelector;
//   }

//   render() {
//     const { chSelector } = this.props;
//     return (
//       <View style={styles.container}>
//         <View style={styles.view}>
//           <SafeAreaView style={styles.area}>
//             <FontAwesomeIcon icon={faSeedling} color="#90EE90" size={20} />
//             <Text style={styles.items}>{Strings.getLang('climateSw')}</Text>
//           </SafeAreaView>
//           <SwitchButton
//             style={styles.switch}
//             tintColor="#ffb700"
//             onTintColor="#90EE90"
//             value={this.getDataSelector()}
//             onValueChange={() => {
//               TYDevice.putDeviceData({
//                 [chSelectorCode]: !chSelector,
//               });
//             }}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   area: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 20,
//   },
//   view: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   items: {
//     alignItems: 'center',
//     color: 'black',
//     fontWeight: 'normal',
//     fontSize: 15,
//     padding: 14,
//   },
//   switch: {
//     paddingRight: 14,
//   },
// });

// export default connect(({ dpState }) => ({
//   chSelector: dpState[chSelectorCode],
// }))(ClimateChScene);
