import { createSlice } from '@reduxjs/toolkit';

import AuthService from '../service/auth.service';

import { logout } from './actions/auth.action';
import { getUserProfile } from './actions/user.action';

export type TAuthState = {
  isAuthenticated: boolean;
  token: string;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginWithGoogle: () => {
      AuthService.loginWithGoogle();
    },
    setToken: (state, { payload }) => {
      localStorage.setItem('token', JSON.stringify(payload));
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state) => {
      state.isAuthenticated = true;
    });

    builder.addCase(getUserProfile.rejected, (state) => {
      localStorage.clear();
      Object.assign(state, initialState);
    });

    builder.addCase(logout, (state) => {
      localStorage.clear();
      Object.assign(state, initialState);
    });
  },
});

export const AuthAction = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
