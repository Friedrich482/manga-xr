/* eslint-disable no-unused-vars */
import { StateCreator } from "zustand";
import { initialIsVisibleImagesArray } from "@/lib/constants";

export type IsVisibleImagesArraySlice = {
  isVisibleImagesArray: boolean[];
  setIsVisibleImagesArray: (newArrayImagesVisibility: boolean[]) => void;
};

export const createIsVisibleImagesArraySlice: StateCreator<
  IsVisibleImagesArraySlice
> = (set) => ({
  isVisibleImagesArray: initialIsVisibleImagesArray,
  setIsVisibleImagesArray: (newArrayImagesVisibility) =>
    set({ isVisibleImagesArray: newArrayImagesVisibility }),
});
