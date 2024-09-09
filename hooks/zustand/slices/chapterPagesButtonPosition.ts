/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

export type ChapterPagesButtonPositionSlice = {
  chapterPagesButtonPosition: number;
  setChapterPagesButtonPosition: (newPosition: number) => void;
};

export const createChapterPagesButtonPositionSlice: StateCreator<
  ChapterPagesButtonPositionSlice
> = (set) => ({
  chapterPagesButtonPosition: 0,
  setChapterPagesButtonPosition: (newPosition) =>
    set({ chapterPagesButtonPosition: newPosition }),
});
