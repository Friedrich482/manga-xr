/* eslint-disable no-unused-vars */
import { ReadingDirection } from "@/zod-schema/schema";
import { StateCreator } from "zustand";

export type ReadingDirectionSlice = {
  readingDirection: ReadingDirection;
  setReadingDirection: (newReadingDirection: ReadingDirection) => void;
};

export const createReadingDirectionSlice: StateCreator<
  ReadingDirectionSlice
> = (set) => ({
  readingDirection: "From left to right",
  setReadingDirection: (newReadingDirection) =>
    set({ readingDirection: newReadingDirection }),
});
