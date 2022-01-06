import React from 'react';
import { StyleSheet } from 'react-native';

import MealsList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const CategoryMealsScreen = props => {
  const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(props.route.params.categoryId) >= 0);

  return (
    <MealsList listData={displayedMeals} navigation={props.navigation} whereToNavigate="MealDetail" />
  );
};

const styles = StyleSheet.create({
  
});

export default CategoryMealsScreen;