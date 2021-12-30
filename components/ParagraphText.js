import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ParagraphText = props => {
  return (
    <Text {...props} style={[styles.text, props.style]}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
  }
});

export default ParagraphText;