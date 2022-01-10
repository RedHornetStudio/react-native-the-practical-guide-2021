import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import ParagraphText from '../components/ParagraphText';
import MealsStackNavigator from './MealsStackNavigator';
import FavoritesStackNavigator from './FavoritesStackNavigator';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={props => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ccc',
        tabBarPressColor: 'white',
        // icon options
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color }) => {
          let iconName
          if (props.route.name === 'MealsTab') {
            iconName = 'ios-restaurant';
          } else if (props.route.name === 'FavoritesTab') {
            iconName = 'ios-star';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label
          if (props.route.name === 'MealsTab') {
            label = 'Meals';
          } else if (props.route.name === 'FavoritesTab') {
            label = 'Favorites';
          }
          return <ParagraphText style={[styles.materialTopTabBarLabelStyle, { color: color }]}>{label}</ParagraphText>;
        },
        // element styles
        tabBarStyle: styles.materilaTopTabBarStyle,
        tabBarItemStyle: styles.materialTopTabBarItemStyle,
        tabBarIndicatorStyle: styles.materialTopTabBarIndicatorStyle,
      })}
      tabBarPosition='bottom'
    >
      <Tab.Screen name="MealsTab" component={MealsStackNavigator} />
      <Tab.Screen name="FavoritesTab" component={FavoritesStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // Material Bottom Tabs Styles
  materilaTopTabBarStyle: {
    backgroundColor: colors.primaryColor,
  },
  materialTopTabBarItemStyle: {
    padding: 0,
    paddingTop: 5,
  },
  materialTopTabBarLabelStyle: {
    fontSize: 12,
  },
  materialTopTabBarIndicatorStyle: {
    backgroundColor: 'white',
    top: 0,
  },
})

export default TabNavigator;