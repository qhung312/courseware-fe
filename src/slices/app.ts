import { StateCreator } from 'zustand';

export interface TAppSlice {
  isAsideOpen: boolean;
  toggleAside: () => void;
  openAside: () => void;
}

export const AppSlice: StateCreator<TAppSlice, [['zustand/devtools', never]], [], TAppSlice> = (
  set
) => ({
  isAsideOpen: true,
  toggleAside: () => set((state) => ({ isAsideOpen: !state.isAsideOpen })),
  openAside: () => set(() => ({ isAsideOpen: true })),
});
