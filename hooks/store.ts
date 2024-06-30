import { create } from "zustand";

type Store = {
  width: number;
  setWidth: (newWidth: number) => void;

  maxWidth: number;
  setMaxWidth: (newMaxWidth: number) => void;

  isResizable: boolean;
  setIsResizable: (oldState: boolean) => void;
};
const useStore = create<Store>((set) => ({
  width: 600,
  setWidth: (newWidth) => set({ width: newWidth }),

  maxWidth: 900,
  setMaxWidth: (newMaxWidth) => set({ maxWidth: newMaxWidth }),

  isResizable: false,
  setIsResizable: () => set((state) => ({ isResizable: !state.isResizable })),
}));

export default useStore;
