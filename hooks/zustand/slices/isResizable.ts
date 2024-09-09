/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

export type IsResizableSlice = {
  isResizable: boolean;
  setIsResizable: (newState: boolean) => void;
};

export const createIsResizableSlice: StateCreator<IsResizableSlice> = (
  set,
) => ({
  isResizable: false,
  setIsResizable: (newIsResizable: boolean) =>
    set({ isResizable: !newIsResizable }),
});
