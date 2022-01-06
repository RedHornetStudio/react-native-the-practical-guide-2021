import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import MealsList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import CustomPressableOpacity from '../components/CustomPressableOpacity';
import sharedStyles from '../shared/sharedStyles';

const FavoritesScreen = props => {

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

  const displayedMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

  return (
    <MealsList listData={displayedMeals} navigation={props.navigation} whereToNavigate="FavoriteMealDetail" />
  );
};

const styles = StyleSheet.create({

});

export default FavoritesScreen;