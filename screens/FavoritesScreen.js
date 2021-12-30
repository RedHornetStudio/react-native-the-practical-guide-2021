import React from 'react';
import { StyleSheet, View } from 'react-native';

import ParagraphText from '../components/ParagraphText';

const FavoritesScreen = props => {
  return (
    <View style={styles.screen}>
      <ParagraphText>The Favorites Screen!</ParagraphText>
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

export default FavoritesScreen;