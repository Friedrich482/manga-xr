/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";
import { WINDOW_DEFAULT_WIDTH } from "@/lib/constants";
export type WidthSlice = {
  width: number;
  setWidth: (newWidth: number) => void;
};

export const createWidthSlice: StateCreator<WidthSlice> = (set) => ({
  width: WINDOW_DEFAULT_WIDTH,
  setWidth: (newWidth) => set({ width: newWidth }),
});
