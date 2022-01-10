import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealsList from '../components/MealList';

const CategoryMealsScreen = props => {
  const availableMeals = useSelector(state => state.mealsReducer.meals);

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(props.route.params.categoryId) >= 0);

  return (
    <MealsList listData={displayedMeals} navigation={props.navigation} whereToNavigate="MealDetail" />
  );
};

const styles = StyleSheet.create({
  
});

export default CategoryMealsScreen;