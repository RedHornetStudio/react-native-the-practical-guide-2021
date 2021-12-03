import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from '../constants/colors';

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 10,
  },
  number: {
    color: colors.accent,
    fontSize: 22,
  }
});

export default NumberContainer;