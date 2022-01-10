export const LOAD_ALL_MEALS = 'LOAD_ALL_MEALS';

export const loadAllMeals = meals => {
  return { type: LOAD_ALL_MEALS, meals: meals }
};