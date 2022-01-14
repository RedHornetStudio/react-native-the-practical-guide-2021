import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import RootNavigationContainer from './navigators/RootNavigationContainer';
import { Provider } from 'react-redux';
import mealsSlice from './features/mealsSlice';
import favoriteMealsSlice from './features/favoriteMealsSlice';
import filtersSlice from './features/filtersSlice';

const rootReducer = combineReducers({
  mealsReducer: mealsSlice.reducer,
  favoriteMealsReducer: favoriteMealsSlice.reducer,
  filtersReducer: filtersSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
})

export default function App() {
  let [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <RootNavigationContainer />
    </Provider>
  );
}