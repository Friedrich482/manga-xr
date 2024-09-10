/* eslint-disable no-unused-vars */
import { ChapterPagesDisposition } from "@/zod-schema/schema";
import { StateCreator } from "zustand";

export type ChapterPagesDispositionSlice = {
  chapterPagesDisposition: ChapterPagesDisposition;
  setChapterPagesDisposition: (newDisposition: ChapterPagesDisposition) => void;
};

export const createChapterPagesDispositionSlice: StateCreator<
  ChapterPagesDispositionSlice
> = (set) => ({
  chapterPagesDisposition: "Long Strip",
  setChapterPagesDisposition: (newDisposition) =>
    set({ chapterPagesDisposition: newDisposition }),
});
