import React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';


import colors from './constants/colors';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { CATEGORIES } from './data/dummy-data';
import { MEALS } from './data/dummy-data'
import FavoritesScreen from './screens/FavoritesScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const Stack = createNativeStackNavigator();

  const Meals = props => {
    React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('tabPress', (e) => {
        // Prevent default behavior
        e.preventDefault();
  
        // alert('Default behavior prevented');
        props.navigation.navigate('Meals');
        // ...
      });
  
      return unsubscribe;
    }, [props.navigation]);

    return (
      <Stack.Navigator 
        initialRouteName="Categories"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primaryColor,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'OpenSans-Bold',
          },
        }}
      >
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
        <Stack.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={props => ({ title: CATEGORIES.find(elem => elem.id === props.route.params.categoryId).title })} />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={props => ({ title: MEALS.find(elem => elem.id === props.route.params.mealId).title })}/>
      </Stack.Navigator>
    );
  }

  // material top tabs
  if(true) {
    const Tab = createMaterialTopTabNavigator();

    return (
      <NavigationContainer>
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
              if (props.route.name === 'Meals') {
                iconName = 'ios-restaurant';
              } else if (props.route.name === 'Favorites') {
                iconName = 'ios-star';
              }
              return <Ionicons name={iconName} size={25} color={color} />;
            },
            tabBarLabel: ({ focused, color }) => {
              let label
              if (props.route.name === 'Meals') {
                label = 'Meals';
              } else if (props.route.name === 'Favorites') {
                label = 'Favorites';
              }
              return <Text style={[styles.materialTopTabBarLabelStyle, { color: color }]}>{label}</Text>;
            },
            // element styles
            tabBarStyle: styles.materilaTopTabBarStyle,
            tabBarItemStyle: styles.materialTopTabBarItemStyle,
            tabBarIndicatorStyle: styles.materialTopTabBarIndicatorStyle,
          })}
          tabBarPosition='bottom'
        >
          <Tab.Screen name="Meals" component={Meals} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  // bottom tabs
  if (Platform.OS === 'android') {
    const Tab = createMaterialBottomTabNavigator();

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={props => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName
              if (props.route.name === 'Meals') {
                iconName = 'ios-restaurant';
              } else if (props.route.name === 'Favorites') {
                iconName = 'ios-star';
              }
              return <Ionicons name={iconName} size={25} color={color} />;
            },
          })}
          shifting={true}
          activeColor='white'
          inactiveColor='#ccc'
        >
          <Tab.Screen name="Meals" component={Meals} options={{ tabBarLabel: 'Meals', tabBarColor: colors.primaryColor }} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: 'Favorites', tabBarColor: colors.accentColor }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    const Tab = createBottomTabNavigator();

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={props => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (props.route.name === 'Meals') {
                iconName = 'ios-restaurant';
              } else if (props.route.name === 'Favorites') {
                iconName = 'ios-star';
              }
              return <Ionicons name={iconName} size={25} color={color} />;
            },
            tabBarActiveTintColor: colors.accentColor,
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontFamily: 'OpenSans-Regular' },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Meals" component={Meals} options={{ tabBarLabel: 'Meals' }} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: 'Favorites' }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
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
    fontFamily: 'OpenSans-Regular',
  },
  materialTopTabBarIndicatorStyle: {
    backgroundColor: 'white',
    top: 0,
  },
})