import { StateCreator } from 'zustand';

import UserService from '../service/user.service';
import { ROLES } from '../types/auth';

import { TAuthSlice } from './auth';

export interface TUserState {
  id: string | null;
  googleId: string | null;
  role: ROLES | null;
  name: string | null;
  picture: string | null;
  dateOfBirth: number | null;
  email: string | null;
}

export interface TUserActions {
  getUserProfile: () => Promise<void>;
}

export interface TUserSlice extends TUserActions {
  user: TUserState;
}

export const initialState: TUserState = {
  id: null,
  googleId: null,
  role: null,
  name: null,
  picture: null,
  dateOfBirth: null,
  email: null,
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
          id: data.payload?._id,
          googleId: data.payload?.googleId,
          role: data.payload?.role,
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
