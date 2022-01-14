import { createSlice } from '@reduxjs/toolkit';

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: []
  },
  reducers: {
    allMealsLoaded: (state, action) => {
      state.meals = action.payload
    },
    mealDeleted: (state, action) => {
      const newMeals = state.meals.filter(meal => meal.id !== action.payload);
      state.meals = newMeals;
    },
  }
});

export const { allMealsLoaded, mealDeleted } = mealsSlice.actions;
export default mealsSlice;