/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

export type CurrentPageIndexSlice = {
  currentPageIndex: number;
  setCurrentPageIndex: (newPageIndex: number) => void;
};

export const createCurrentPageIndexSlice: StateCreator<
  CurrentPageIndexSlice
> = (set) => ({
  currentPageIndex: 0,
  setCurrentPageIndex: (newPageIndex) =>
    set({ currentPageIndex: newPageIndex }),
});
