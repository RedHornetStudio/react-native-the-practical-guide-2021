import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultHeaderStyles } from '../shared/sharedStyles';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

const FavoritesStack = createNativeStackNavigator();

const FavoritesStackNavigator = props => {
  return (
    <FavoritesStack.Navigator
      initialRouteName="Favorites"
      screenOptions={defaultHeaderStyles}
    >
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Your Favorites' }} />
      <FavoritesStack.Screen
        name="FavoriteMealDetail"
        component={MealDetailScreen}
        options={{ title: 'Meal details' }}
      />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesStackNavigator;