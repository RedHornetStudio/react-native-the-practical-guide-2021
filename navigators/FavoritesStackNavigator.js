import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { defaultHeaderStyles } from '../shared/sharedStyles';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const FavoritesStack = createNativeStackNavigator();

const FavoritesStackNavigator = props => {
  const availableMeals = useSelector(state => state.mealsReducer.meals);

  return (
    <FavoritesStack.Navigator
      initialRouteName="Favorites"
      screenOptions={defaultHeaderStyles}
    >
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Your Favorites' }} />
      <FavoritesStack.Screen
        name="FavoriteMealDetail"
        component={MealDetailScreen}
        options={props => ({ title: availableMeals.find(elem => elem.id === props.route.params.mealId).title })}
      />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesStackNavigator;