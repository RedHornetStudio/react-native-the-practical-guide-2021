import React from 'react';
import { StyleSheet, Platform } from 'react-native'

import CustomPressableOpacity from '../components/CustomPressableOpacity';
import CustomPressableRipple from '../components/CustomPressableRipple';
import HeaderText from './HeaderText';

const CategoryGridTile = props => {
  let ButtonComponent = CustomPressableOpacity;
  if(Platform.OS === 'android') ButtonComponent = CustomPressableRipple;

  return (
    <ButtonComponent {...props} style={[styles.gridItem, props.style]}>
      <HeaderText style={[props.textStyle]} numberOfLines={2}>{props.title}</HeaderText>
    </ButtonComponent>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    padding: 20,
    width: 150,
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default CategoryGridTile;