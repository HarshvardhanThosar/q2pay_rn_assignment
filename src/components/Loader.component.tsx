import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.blankScreen}>
      <ActivityIndicator animating />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  blankScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
