import React from 'react';
import { StyleSheet, View } from 'react-native';

import ParagraphText from '../components/ParagraphText';

const FiltersScreen = props => {
  return (
    <View style={styles.screen}>
      <ParagraphText>The Filters Screen!</ParagraphText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FiltersScreen;