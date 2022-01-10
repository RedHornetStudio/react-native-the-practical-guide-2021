import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import colors from '../constants/colors';
import ParagraphText from '../components/ParagraphText';
import TabNavigator from './TabNavigator';
import FiltersStackNavigator from './FiltersStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      screenOptions={props => ({
        headerShown: false,
        drawerActiveTintColor: colors.primaryColor,
        drawerLabel: ({ focused, color }) => {
          let drawerLabel;
          if (props.route.name === 'Tabs') {
            drawerLabel = 'Meals';
          } else if (props.route.name === 'FiltersStack') {
            drawerLabel = 'Filters';
          }
          return <ParagraphText style={[{ color: color }]}>{drawerLabel}</ParagraphText>
        },
      })}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="FiltersStack" component={FiltersStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
