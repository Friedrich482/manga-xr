/* eslint-disable no-unused-vars */
import { ProgressBarDirection } from "@/zod-schema/schema";
import { StateCreator } from "zustand";

export type ProgressBarDirectionSlice = {
  progressBarDirection: ProgressBarDirection;
  setProgressBarDirection: (
    newProgressBarDirection: ProgressBarDirection,
  ) => void;
};

export const createProgressBarDirectionSlice: StateCreator<
  ProgressBarDirectionSlice
> = (set) => ({
  progressBarDirection: "Horizontal",
  setProgressBarDirection: (newProgressBarDirection) =>
    set({ progressBarDirection: newProgressBarDirection }),
});
