import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { MEALS } from '../data/dummy-data';
import DrawerNavigator from './DrawerNavigator';
import { allMealsLoaded } from '../features/mealsSlice';
import { allFavoriteMealsLoaded } from '../features/favoriteMealsSlice';
import { filtersChanged } from '../features/filtersSlice';

// simulate data from data base
const a = JSON.stringify(MEALS);
const mealsFromDataBase = JSON.parse(a);
const b = JSON.stringify(['m1', 'm4', 'm8', 'm10']);
const favoriteMealsFromDataBase = JSON.parse(b)
const filtersFromDataBase = '["isVegan"]';

const RootNavigationContainer = props => {

  const dispatch = useDispatch();

  useEffect(() => {
    // simulate loading of meals from databade by using setTimeout(), and updating state after succesful loading
    setTimeout(() => {
      dispatch(allMealsLoaded(mealsFromDataBase));
      dispatch(allFavoriteMealsLoaded(favoriteMealsFromDataBase));
      dispatch(filtersChanged(filtersFromDataBase));
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default RootNavigationContainer;