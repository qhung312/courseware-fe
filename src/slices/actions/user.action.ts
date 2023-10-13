import { createAsyncThunk } from '@reduxjs/toolkit';

import UserService from '../../service/user.service';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_, thunkAPI) => {
  try {
    const { data } = await UserService.getUserProfile();
    return data.payload;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
