import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';


import colors from './constants/colors';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { CATEGORIES } from './data/dummy-data';
import { MEALS } from './data/dummy-data'
import FavoritesScreen from './screens/FavoritesScreen';
import FiltersScreen from './screens/FiltersScreen';
import ParagraphText from './components/ParagraphText';

export default function App() {
  let [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const defaultHeaderStyles = {
    headerStyle: {
      backgroundColor: colors.primaryColor,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontFamily: 'OpenSans-Bold',
    },
    headerBackTitleStyle: {
      fontFamily: 'OpenSans-Regular',
    },
  }

  // native stack navigators
  const MealsStack = createNativeStackNavigator();
  const MealsStackScreen = props => {
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
          options={props => ({ title: MEALS.find(elem => elem.id === props.route.params.mealId).title })}
        />
      </MealsStack.Navigator>
    );
  }

  const FavoritesStack = createNativeStackNavigator();
  const FavoritesStackScreen = props => {
    return (
      <FavoritesStack.Navigator
        initialRouteName="Favorites"
        screenOptions={defaultHeaderStyles}
      >
        <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Your Favorites' }} />
        <FavoritesStack.Screen
          name="FavoriteMealDetail"
          component={MealDetailScreen}
          options={props => ({ title: MEALS.find(elem => elem.id === props.route.params.mealId).title })}
        />
      </FavoritesStack.Navigator>
    );
  };

  const FiltersStack = createNativeStackNavigator();
  const FiltersStackScreen = props => {
    return (
      <FiltersStack.Navigator
        initialRouteName="Filters"
        screenOptions={defaultHeaderStyles}
      >
        <FiltersStack.Screen name="Filters" component={FiltersScreen} options={{ title: 'Filters' }} />
      </FiltersStack.Navigator>
    );
  };

  // material top tabs (displayed in the bottom)
  const Tab = createMaterialTopTabNavigator();
  const TabScreen = props => {
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
        <Tab.Screen name="MealsTab" component={MealsStackScreen} />
        <Tab.Screen name="FavoritesTab" component={FavoritesStackScreen} />
      </Tab.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
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
        <Drawer.Screen name="Tabs" component={TabScreen} />
        <Drawer.Screen name="FiltersStack" component={FiltersStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );


  // bottom tabs
  if(false) {
    if (Platform.OS === 'android') {
      const Tab = createMaterialBottomTabNavigator();

      return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={props => ({
              tabBarIcon: ({ focused, color }) => {
                let iconName
                if (props.route.name === 'MealsTab') {
                  iconName = 'ios-restaurant';
                } else if (props.route.name === 'FavoritesTab') {
                  iconName = 'ios-star';
                }
                return <Ionicons name={iconName} size={25} color={color} />;
              },
            })}
            shifting={true}
            activeColor='white'
            inactiveColor='#ccc'
          >
            <Tab.Screen name="MealsTab" component={MealsStackScreen} options={{ tabBarLabel: 'Meals', tabBarColor: colors.primaryColor }} />
            <Tab.Screen name="FavoritesTab" component={FavoritesStackScreen} options={{ tabBarLabel: 'Favorites', tabBarColor: colors.accentColor }} />
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
                if (props.route.name === 'MealsTab') {
                  iconName = 'ios-restaurant';
                } else if (props.route.name === 'FavoritesTab') {
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
            <Tab.Screen name="MealsTab" component={MealsStackScreen} options={{ tabBarLabel: 'Meals' }} />
            <Tab.Screen name="FavoritesTab" component={FavoritesStackScreen} options={{ tabBarLabel: 'Favorites' }} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
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
  },
  materialTopTabBarIndicatorStyle: {
    backgroundColor: 'white',
    top: 0,
  },
})