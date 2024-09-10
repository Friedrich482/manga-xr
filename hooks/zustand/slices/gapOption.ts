/* eslint-disable no-unused-vars */
import { GapOption } from "@/zod-schema/schema";
import { StateCreator } from "zustand";
import { gapOptions } from "@/lib/constants";

export type GapOptionSlice = {
  gapOption: GapOption;
  setGapOption: (newGapOption: GapOption) => void;
};

export const createGapOptionSlice: StateCreator<GapOptionSlice> = (set) => ({
  gapOption: gapOptions[0],
  setGapOption: (newGapOption) => set({ gapOption: newGapOption }),
});
