import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import MealsList from '../components/MealList';
import ParagraphText from '../components/ParagraphText';

const CategoryMealsScreen = props => {
  console.log('Category meals screen rerendered');
  const availableMeals = useSelector(state => state.mealsReducer.meals);
  const filters = JSON.parse(useSelector(state => state.filtersReducer.filters));
  let displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(props.route.params.categoryId) >= 0);
  displayedMeals = filters.includes('isGlutenFree') ? displayedMeals.filter(meal => meal.isGlutenFree) : displayedMeals;
  displayedMeals = filters.includes('isLactoseFree') ? displayedMeals.filter(meal => meal.isLactoseFree) : displayedMeals;
  displayedMeals = filters.includes('isVegan') ? displayedMeals.filter(meal => meal.isVegan) : displayedMeals;
  displayedMeals = filters.includes('isVegeterian') ? displayedMeals.filter(meal => meal.isGlutenFree) : displayedMeals;

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.noMeals}>
        <ParagraphText style={styles.noMealsText}>No meals found, maybe check your filters?</ParagraphText>
      </View>
    );
  }

  return (
    <MealsList listData={displayedMeals} navigation={props.navigation} whereToNavigate="MealDetail" />
  );
};

const styles = StyleSheet.create({
  noMeals: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMealsText: {
    fontSize: 30,
  }
});

export default CategoryMealsScreen;