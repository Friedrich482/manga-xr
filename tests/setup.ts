import { vi } from "vitest";

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

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    useRouter: vi.fn(),
    usePathname: vi.fn(),
    ...actual,
  };
});
