/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";
export type MaxWidthSlice = {
  maxWidth: number;
  setMaxWidth: (newMaxWidth: number) => void;
};

export const createMaxWidthSlice: StateCreator<MaxWidthSlice> = (set) => ({
  maxWidth: 900,
  setMaxWidth: (newMaxWidth) => set({ maxWidth: newMaxWidth }),
});
