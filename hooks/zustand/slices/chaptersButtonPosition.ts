/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

export type ChaptersButtonPositionSlice = {
  chaptersButtonPosition: number;
  setChaptersButtonPosition: (newPosition: number) => void;
};

export const createChaptersButtonPositionSlice: StateCreator<
  ChaptersButtonPositionSlice
> = (set) => ({
  chaptersButtonPosition: 0,
  setChaptersButtonPosition: (newPosition) =>
    set({ chaptersButtonPosition: newPosition }),
});
