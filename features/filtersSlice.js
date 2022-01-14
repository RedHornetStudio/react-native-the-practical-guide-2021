import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: '[]',
  },
  reducers: {
    filtersChanged: (state, action) => {
      state.filters = action.payload;
    },
  }
});

export const { filtersChanged } = filtersSlice.actions;
export default filtersSlice;