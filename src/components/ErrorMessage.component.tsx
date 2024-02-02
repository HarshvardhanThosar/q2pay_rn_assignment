import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

type ErrorMessageProps = {
  message: string;
  retry: () => void;
};
const ErrorMessage = ({message, retry}: ErrorMessageProps) => {
  return (
    <View style={styles.blankScreen}>
      <Text style={styles.errorMessage}>Error: {message}</Text>
      <Button mode="outlined" onPress={retry}>
        Retry
      </Button>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  blankScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    fontSize: 16,
    padding: 10,
  },
});
