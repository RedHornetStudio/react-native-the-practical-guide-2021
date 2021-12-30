import React from 'react';
import { StyleSheet, Text } from 'react-native';

const HeaderText = props => {
  return (
    <Text {...props} style={[styles.text, props.style]}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Bold',
  }
});

export default HeaderText;