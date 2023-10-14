import { createSlice } from '@reduxjs/toolkit';

import { Subject } from '../types/library';

import { getAllSubjects } from './actions/library.action';

export type TLibraryState = {
  subjects: Array<Subject> | null;
};

const initialState: TLibraryState = {
  subjects: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSubjects.fulfilled, (state, { payload }) => {
      state.subjects = payload;
    });
    builder.addCase(getAllSubjects.rejected, (state) => {
      state.subjects = [];
    });
  },
});

export const LibraryAction = librarySlice.actions;
const libraryReducer = librarySlice.reducer;
export default libraryReducer;
