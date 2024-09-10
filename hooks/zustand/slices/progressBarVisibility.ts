/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

export type ProgressBarVisibilitySlice = {
  progressBarVisibility: boolean;
  setProgressBarVisibility: (newProgressBarVisibility: boolean) => void;
};

export const createProgressBarVisibilitySlice: StateCreator<
  ProgressBarVisibilitySlice
> = (set) => ({
  progressBarVisibility: true,
  setProgressBarVisibility: (newProgressBarVisibility) =>
    set({ progressBarVisibility: newProgressBarVisibility }),
});
