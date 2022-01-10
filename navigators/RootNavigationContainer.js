import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { MEALS } from '../data/dummy-data';
import DrawerNavigator from './DrawerNavigator';
import { loadAllMeals } from '../store/actions/mealsActions';

const RootNavigationContainer = props => {

  const dispatch = useDispatch();

  useEffect(() => {
    // load meals asyncronously from data base and when meals are loaded update redux state
    dispatch(loadAllMeals(MEALS));
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default RootNavigationContainer;