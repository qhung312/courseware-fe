import { createAsyncThunk } from '@reduxjs/toolkit';

import LibraryService from '../../service/library.service';

export const getAllSubjects = createAsyncThunk('lib/getAllSubjects', async (_, thunkAPI) => {
  try {
    const { data } = await LibraryService.getAllSubjects();
    return data.payload;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
