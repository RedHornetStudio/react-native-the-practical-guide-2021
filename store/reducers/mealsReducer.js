import { LOAD_ALL_MEALS } from '../actions/mealsActions';

const initialState = {
  meals: [],
  filteredMeals: [],
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_MEALS:
      return {
        ...state,
        meals: action.meals
      }
    default:
      return state;
  }
  
}

export default mealsReducer;