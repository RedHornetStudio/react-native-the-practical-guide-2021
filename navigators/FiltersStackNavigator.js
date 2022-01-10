import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultHeaderStyles } from '../shared/sharedStyles';
import FiltersScreen from '../screens/FiltersScreen';

const FiltersStack = createNativeStackNavigator();

const FiltersStackNavigator = props => {
  return (
    <FiltersStack.Navigator
      initialRouteName="Filters"
      screenOptions={defaultHeaderStyles}
    >
      <FiltersStack.Screen name="Filters" component={FiltersScreen} options={{ title: 'Filters' }} />
    </FiltersStack.Navigator>
  );
};

export default FiltersStackNavigator;