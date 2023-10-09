import { createSlice } from '@reduxjs/toolkit';

import { ROLES } from '../types/auth';

import { logout } from './actions/auth.action';
import { getUserProfile } from './actions/user.action';

export type TUserState = {
  id: string | null;
  googleId: string | null;
  role: ROLES | null;
  name: string | null;
  picture: string | null;
  dateOfBirth: number | null;
  email: string | null;
};

const initialState: TUserState = {
  id: null,
  googleId: null,
  role: null,
  name: null,
  picture: null,
  dateOfBirth: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      state.id = payload?._id;
      state.googleId = payload?.googleId;
      state.role = payload?.role;
      state.name = payload?.name;
      state.picture = payload?.picture;
      state.dateOfBirth = payload?.dateOfBirth;
      state.email = payload?.email;
    });

    builder.addCase(getUserProfile.rejected, () => initialState);

    builder.addCase(logout, () => initialState);
  },
});

export const UserAction = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
