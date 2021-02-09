import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonMode from './buttons-mode';

const ButtonsScene = () => (
  <View style={styles.container}>
    <ButtonMode />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ButtonsScene;
