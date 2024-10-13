import { vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useState: vi.fn(),
    useRef: vi.fn(),
    useEffect: vi.fn(),
  };
});

vi.mock(import("../hooks/zustand/store"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useStore: vi.fn().mockImplementation(() => {
      return {
        subscribe: vi.fn(),
        getState: vi.fn(),
        setState: vi.fn(),
      };
    }),
  };
});
