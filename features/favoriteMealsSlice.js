import { createSlice } from '@reduxjs/toolkit';

const favoriteMealsSlice = createSlice({
  name: 'favoriteMeals',
  initialState: {
    favoriteMeals: []
  },
  reducers: {
    allFavoriteMealsLoaded: (state, action) => {
      state.favoriteMeals = action.payload;
    },
    mealAddedToFavoriteMeals: (state, action) => {
      const newFavoriteMeals = state.favoriteMeals;
      if (newFavoriteMeals.indexOf(action.payload) < 0) newFavoriteMeals.push(action.payload);
      state.favoriteMeals = newFavoriteMeals;
    },
    mealDeletedFromFavoriteMeals: (state, action) => {
      const newFavoriteMeals = state.favoriteMeals.filter(mealId => mealId !== action.payload);
      state.favoriteMeals = newFavoriteMeals;
    },
  }
})

export const { mealAddedToFavoriteMeals, mealDeletedFromFavoriteMeals, allFavoriteMealsLoaded } = favoriteMealsSlice.actions;
export default favoriteMealsSlice;