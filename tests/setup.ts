import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

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
