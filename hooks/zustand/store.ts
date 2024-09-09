"use client";
import {
  ChapterPagesButtonPositionSlice,
  createChapterPagesButtonPositionSlice,
} from "./slices/chapterPagesButtonPosition";
import {
  ChapterPagesDispositionSlice,
  createChapterPagesDispositionSlice,
} from "./slices/chapterPagesDisposition";
import {
  ChaptersButtonPositionSlice,
  createChaptersButtonPositionSlice,
} from "./slices/chaptersButtonPosition";
import {
  CurrentPageIndexSlice,
  createCurrentPageIndexSlice,
} from "./slices/currentPageIndex";
import { GapOptionSlice, createGapOptionSlice } from "./slices/gapOption";
import { IsResizableSlice, createIsResizableSlice } from "./slices/isResizable";
import {
  IsVisibleImagesArraySlice,
  createIsVisibleImagesArraySlice,
} from "./slices/isVisibleImagesArray";
import { MaxWidthSlice, createMaxWidthSlice } from "./slices/maxWidth";
import {
  ProgressBarDirectionSlice,
  createProgressBarDirectionSlice,
} from "./slices/progressBarDirection";
import {
  ProgressBarVisibilitySlice,
  createProgressBarVisibilitySlice,
} from "./slices/progressBarVisibility";
import {
  ReadingDirectionSlice,
  createReadingDirectionSlice,
} from "./slices/readingDirection";
import { WidthSlice, createWidthSlice } from "./slices/width";
import { create } from "zustand";

type Store = WidthSlice &
  MaxWidthSlice &
  IsResizableSlice &
  GapOptionSlice &
  IsVisibleImagesArraySlice &
  ProgressBarDirectionSlice &
  ProgressBarVisibilitySlice &
  ChapterPagesDispositionSlice &
  CurrentPageIndexSlice &
  ReadingDirectionSlice &
  CurrentPageIndexSlice &
  ChapterPagesButtonPositionSlice &
  ChaptersButtonPositionSlice;

const useStore = create<Store>()((...a) => ({
  ...createWidthSlice(...a),
  ...createMaxWidthSlice(...a),
  ...createIsResizableSlice(...a),
  ...createGapOptionSlice(...a),
  ...createIsVisibleImagesArraySlice(...a),
  ...createIsVisibleImagesArraySlice(...a),
  ...createProgressBarDirectionSlice(...a),
  ...createProgressBarVisibilitySlice(...a),
  ...createChapterPagesDispositionSlice(...a),
  ...createCurrentPageIndexSlice(...a),
  ...createReadingDirectionSlice(...a),
  ...createChapterPagesButtonPositionSlice(...a),
  ...createChaptersButtonPositionSlice(...a),
}));

export default useStore;
