import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import appReducer from './slices/app';
import authReducer from './slices/auth';
import libraryReducer from './slices/library';
import userReducer from './slices/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    library: libraryReducer,
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
