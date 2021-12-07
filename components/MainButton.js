import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../constants/colors';
import CustomPressableOpacity from './CustomPressableOpacity';

const MainButton = props => {
  return (
    <CustomPressableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </CustomPressableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
  },
});

export default MainButton;