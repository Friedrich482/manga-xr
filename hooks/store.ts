"use client";
import { create } from "zustand";
import {
  ProgressBarDirection,
  ChapterPagesDisposition,
  ReadingDirection,
  GapOption,
} from "@/zod-schema/schema";
import { gapOptions } from "@/lib/constants";

type Store = {
  // actual width of chapter pages (images)
  width: number;
  setWidth: (newWidth: number) => void;

  // width of the screen
  maxWidth: number;
  setMaxWidth: (newMaxWidth: number) => void;

  // Boolean attached to a checkbox to allow user to either resize pages himself or let it responsive
  isResizable: boolean;
  setIsResizable: (newState: boolean) => void;

  // gap between the pages state controller
  gapOption: GapOption;
  setGapOption: (newGapOption: GapOption) => void;

  // state controlling an array of booleans, values depending of the visibility of an image or not on the page
  isVisibleImagesArray: boolean[];
  setIsVisibleImagesArray: (newArrayImagesVisibility: boolean[]) => void;

  // Direction of the progressBar (vertical or horizontal)
  progressBarDirection: ProgressBarDirection;
  setProgressBarDirection: (
    newProgressBarDirection: ProgressBarDirection,
  ) => void;

  // the visibility of the progressBar
  progressBarVisibility: boolean;
  setProgressBarVisibility: (newProgressBarVisibility: boolean) => void;

  // chapter pages disposition
  chapterPagesDisposition: ChapterPagesDisposition;
  setChapterPagesDisposition: (newDisposition: ChapterPagesDisposition) => void;
  // current page index
  currentPageIndex: number;
  setCurrentPageIndex: (newPageIndex: number) => void;

  readingDirection: ReadingDirection;
  setReadingDirection: (newReadingDirection: ReadingDirection) => void;

  chapterPagesButtonPosition: number;
  setChapterPagesButtonPosition: (newPosition: number) => void;

  chaptersButtonPosition: number;
  setChaptersButtonPosition: (newPosition: number) => void;
};

const useStore = create<Store>((set) => ({
  width: 600,
  setWidth: (newWidth) => set({ width: newWidth }),

  maxWidth: 900,
  setMaxWidth: (newMaxWidth) => set({ maxWidth: newMaxWidth }),

  isResizable: false,
  setIsResizable: () => set((state) => ({ isResizable: !state.isResizable })),

  gapOption: gapOptions[0],
  setGapOption: (newGapOption) => set({ gapOption: newGapOption }),

  isVisibleImagesArray: new Array(10).fill(false),
  setIsVisibleImagesArray: (newArrayImagesVisibility) =>
    set({ isVisibleImagesArray: newArrayImagesVisibility }),

  progressBarDirection: "Horizontal",
  setProgressBarDirection: (newProgressBarDirection) =>
    set({ progressBarDirection: newProgressBarDirection }),

  progressBarVisibility: true,
  setProgressBarVisibility: () =>
    set((state) => ({ progressBarVisibility: !state.progressBarVisibility })),

  chapterPagesDisposition: "Long Strip",
  setChapterPagesDisposition: (newDisposition) =>
    set({ chapterPagesDisposition: newDisposition }),

  currentPageIndex: 0,
  setCurrentPageIndex: (newPageIndex) =>
    set({ currentPageIndex: newPageIndex }),

  readingDirection: "From left to right",
  setReadingDirection: (newReadingDirection) =>
    set({ readingDirection: newReadingDirection }),

  chapterPagesButtonPosition: 0,
  setChapterPagesButtonPosition: (newPosition) =>
    set({ chapterPagesButtonPosition: newPosition }),

  chaptersButtonPosition: 0,
  setChaptersButtonPosition: (newPosition) =>
    set({ chaptersButtonPosition: newPosition }),
}));

export default useStore;
