import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { createStore, combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';

import mealsReducer from './store/reducers/mealsReducer';
import RootNavigationContainer from './navigators/RootNavigationContainer';
import { Provider } from 'react-redux';
// import mealsSlice from './features/mealsSlice';

// const store = configureStore({
//   reducer: mealsSlice.reducer
// })

// console.log(store);

const rootReducer = combineReducers({
  mealsReducer: mealsReducer
});

const store = createStore(rootReducer);

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