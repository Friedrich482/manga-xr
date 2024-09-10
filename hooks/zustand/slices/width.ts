/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";
export type WidthSlice = {
  width: number;
  setWidth: (newWidth: number) => void;
};

export const createWidthSlice: StateCreator<WidthSlice> = (set) => ({
  width: 600,
  setWidth: (newWidth) => set({ width: newWidth }),
});
