import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

import colors from '../constants/colors';
import TitleText from './TitleText';

const Header = ({ title }) => {
  return (
    <View style={[styles.header, Platform.OS === 'android' ? styles.headerAndroid : styles.headerIOS]}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    paddingTop: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
  },
});

export default Header;