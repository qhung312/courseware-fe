import { StateCreator } from 'zustand';

import LibraryService from '../service/library.service';
import { Subject } from '../types/library';

export interface TLibraryState {
  subjects: Array<Subject> | null;
}

export interface TLibraryActions {
  getAllSubjects: () => Promise<void>;
}

export interface TLibrarySlice extends TLibraryState, TLibraryActions {}

export const initialState: TLibraryState = {
  subjects: null,
};

export const LibrarySlice: StateCreator<
  TLibrarySlice,
  [['zustand/devtools', never]],
  [],
  TLibrarySlice
> = (set) => ({
  ...initialState,
  getAllSubjects: async () => {
    try {
      const { data } = await LibraryService.getAllSubjects();
      set({ subjects: data.payload });
    } catch (error: any) {
      set({ ...initialState });
    }
  },
});
