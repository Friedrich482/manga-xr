import { SWRConfig, useSWRConfig } from "swr";
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

vi.mock("next-themes", () => {
  const actual = vi.importActual("next-themes");
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      themes: [],
      forcedTheme: "light",
      setTheme: vi.fn(),
      theme: "light",
      resolvedTheme: "light",
      systemTheme: "light",
    })),
  };
});

// vi.mock("swr", () => {
//   const actual = vi.importActual("swr");
//   return {
//     ...actual,
//     useSWR: vi.fn(() => ({
//       data: null,
//       error: null,
//       isLoading: false,
//       mutate: vi.fn(),
//       revalidate: vi.fn(),
//     })),
//     useSWRConfig: vi.fn(),
//     useSWRInfinite: vi.fn(),
//     useSWRMutation: vi.fn(),
//     useSWRPages: vi.fn(),
//     SWRConfig: vi.fn(),
//   };
// });
