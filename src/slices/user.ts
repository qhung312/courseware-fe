import { StateCreator } from 'zustand';

import UserService from '../service/user.service';

import { TAuthSlice } from './auth';

import type { User } from '../types/user';

export interface TUserState extends User {}

export interface TUserActions {
  getUserProfile: () => Promise<void>;
}

export interface TUserSlice extends TUserActions {
  user: TUserState;
}

export const initialState: TUserState = {
  googleId: '',
  accessLevels: [],
  isManager: false,
  name: '',
  picture: '',
  dateOfBirth: 0,
  email: '',
};

export const UserSlice: StateCreator<
  TUserSlice & TAuthSlice,
  [['zustand/devtools', never]],
  [],
  TUserSlice
> = (set) => ({
  user: initialState,
  getUserProfile: async () => {
    try {
      const { data } = await UserService.getUserProfile();
      set((state) => ({
        user: {
          ...state.user,
          googleId: data.payload?.googleId,
          accessLevels: data.payload?.accessLevels,
          isManager: data.payload?.isManager,
          name: data.payload?.name,
          picture: data.payload?.picture,
          dateOfBirth: data.payload?.dateOfBirth,
          email: data.payload?.email,
        },
        isAuthenticated: true,
      }));
    } catch (error: any) {
      set({ user: { ...initialState }, isAuthenticated: false });
    }
  },
});
