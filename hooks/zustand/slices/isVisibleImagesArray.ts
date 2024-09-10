/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";

export type IsVisibleImagesArraySlice = {
  isVisibleImagesArray: boolean[];
  setIsVisibleImagesArray: (newArrayImagesVisibility: boolean[]) => void;
};

export const createIsVisibleImagesArraySlice: StateCreator<
  IsVisibleImagesArraySlice
> = (set) => ({
  isVisibleImagesArray: new Array(10).fill(false),
  setIsVisibleImagesArray: (newArrayImagesVisibility) =>
    set({ isVisibleImagesArray: newArrayImagesVisibility }),
});
