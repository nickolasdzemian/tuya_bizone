import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonsModeS from './buttons-main12';

const ButtonsScene = () => (
  <View style={styles.container}>
    <ButtonsModeS />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ButtonsScene;
