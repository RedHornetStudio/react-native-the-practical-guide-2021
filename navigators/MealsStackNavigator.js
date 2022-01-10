import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { defaultHeaderStyles } from '../shared/sharedStyles';
import { CATEGORIES } from '../data/dummy-data';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const MealsStack = createNativeStackNavigator();

const MealsStackNavigator = props => {
  const availableMeals = useSelector(state => state.mealsReducer.meals);

  return (
    <MealsStack.Navigator 
      initialRouteName="Categories"
      screenOptions={defaultHeaderStyles}
    >
      <MealsStack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
      <MealsStack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={props => ({ title: CATEGORIES.find(elem => elem.id === props.route.params.categoryId).title })}
      />
      <MealsStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={props => ({ title: availableMeals.find(elem => elem.id === props.route.params.mealId)?.title })}
      />
    </MealsStack.Navigator>
  );
}

export default MealsStackNavigator;