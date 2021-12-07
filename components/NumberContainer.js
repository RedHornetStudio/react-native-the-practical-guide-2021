import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';
import BodyText from './BodyText';

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <BodyText style={styles.number}>{props.children}</BodyText>
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