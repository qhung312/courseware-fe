import { createSlice } from '@reduxjs/toolkit';

export type TAppState = {
  isMenuOpen: boolean;
};

const initialState: TAppState = {
  isMenuOpen: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const AppAction = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
