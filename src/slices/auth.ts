import { createSlice } from '@reduxjs/toolkit';

import AuthService from '../service/auth.service';

import { getUserProfile } from './actions/user.action';

export type TAuthState = {
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  loading: false,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      AuthService.login();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    });

    builder.addCase(getUserProfile.rejected, () => initialState);
  },
});

export const AuthAction = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
