import { gapOptions } from "@/components/ChapterPage/OptionsMenu/GapOption/GapOptionDropDown";
import { create } from "zustand";
type gapOption = {
  name: string;
  value: string;
};
type Store = {
  width: number;
  setWidth: (newWidth: number) => void;

  maxWidth: number;
  setMaxWidth: (newMaxWidth: number) => void;

  isResizable: boolean;
  setIsResizable: (newState: boolean) => void;

  gapOption: gapOption;
  setGapOption: (newGapOption: gapOption) => void;

  isVisibleImagesArray: boolean[];
  setIsVisibleImagesArray: (newArrayImagesVisibility: boolean[]) => void;
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
}));

export default useStore;
