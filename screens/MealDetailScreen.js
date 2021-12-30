import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import ParagraphText from '../components/ParagraphText';

const MealDetailScreen = props => {

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => console.log(`Meal with id ${props.route.params.mealId} added to favorites`)}>
          <Ionicons name="ios-star" size={23} color="white" />
        </Pressable>
      ),
    });
  });

  return (
    <View style={styles.screen}>
      <ParagraphText>The Meal Detail Screen!</ParagraphText>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'green',
  },
});

export default MealDetailScreen;