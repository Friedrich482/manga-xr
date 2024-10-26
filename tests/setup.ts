import { vi } from "vitest";

// vi.mock(import("../hooks/zustand/store"), async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     useStore: vi.fn().mockImplementation(() => {
//       return {
//         subscribe: vi.fn(),
//         getState: vi.fn(),
//         setState: vi.fn(),
//       };
//     }),
//   };
// });

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    useRouter: () => {
      return {
        back: vi.fn(),
        push: vi.fn(),

        replace: vi.fn(),
        prefetch: vi.fn(),
      };
    },
    usePathname: vi.fn(),
    useParams: vi.fn(),
    notFound: vi.fn(),
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
