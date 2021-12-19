import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';

import colors from '../constants/colors';
import CustomPressableOpacity from './CustomPressableOpacity';
import CustomPressableRipple from './CustomPressableRipple';

const MainButton = props => {
  let ButtonComponent = CustomPressableOpacity;

  if(Platform.OS === 'android') {
    ButtonComponent = CustomPressableRipple;
  };

  return (
    <ButtonComponent onPress={props.onPress} style={[styles.button, props.style]}>
      <Text style={[styles.buttonText, props.textStyle]}>{props.children}</Text>
    </ButtonComponent>
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