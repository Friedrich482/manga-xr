import { Store } from "./store";
import { vi } from "vitest";

export function createMockStore(initialState: Partial<Store> = {}) {
  let state: Partial<Store> = { ...initialState };

  const store = {
    getState: () => state,
    setState: (newState: Partial<Store>) => {
      state = { ...state, ...newState };
    },
    subscribe: vi.fn(),
  };

  return store;
}
