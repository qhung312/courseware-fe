import { createSlice } from '@reduxjs/toolkit';

export type TAppState = {
  isAsideOpen: boolean;
};

const initialState: TAppState = {
  isAsideOpen: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAside: (state) => {
      state.isAsideOpen = !state.isAsideOpen;
    },
  },
});

export const AppAction = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
