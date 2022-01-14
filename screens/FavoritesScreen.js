import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';

import MealsList from '../components/MealList';
import CustomPressableOpacity from '../components/CustomPressableOpacity';
import sharedStyles from '../shared/sharedStyles';
import ParagraphText from '../components/ParagraphText';

const FavoritesScreen = props => {
  console.log('Favorites screen rerender');

  // adding menu button to header
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <CustomPressableOpacity style={sharedStyles.menuButton} onPress={() => props.navigation.toggleDrawer()}>
          <Ionicons name="ios-menu" size={23} color="white" />
        </CustomPressableOpacity>
      ),
    });
  }, [props.navigation]);

  const availableMeals = useSelector(state => state.mealsReducer.meals);
  const favoriteMeals = useSelector(state => state.favoriteMealsReducer.favoriteMeals);
  const displayedMeals = availableMeals.filter(meal => favoriteMeals.includes(meal.id));

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.noFavorites}>
        <ParagraphText style={styles.noFavoritesText}>No favorite meals found. Start adding some!</ParagraphText>
      </View>
    );
  }

  return (
    <MealsList listData={displayedMeals} navigation={props.navigation} whereToNavigate="FavoriteMealDetail" />
  );
};

const styles = StyleSheet.create({
  noFavorites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 30,
  }
});

export default FavoritesScreen;