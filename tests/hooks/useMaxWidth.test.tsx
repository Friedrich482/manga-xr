import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { WINDOW_DEFAULT_WIDTH } from "@/lib/constants";
import { act } from "react";
import { renderHook } from "@testing-library/react";
import useMaxWidth from "@/hooks/useMaxWidth";

describe("useMaxWidth", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  beforeAll(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  beforeEach(() => {
    // Reset to default values before each test
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  afterAll(() => {
    // Clean up
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });

  function setWindowSize(width: number, height: number) {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: height,
    });
    window.dispatchEvent(new Event("resize"));
  }

  it("should return window.innerWidth", () => {
    const { result } = renderHook(() => useMaxWidth());
    expect(result.current).toBeDefined();
    expect(result.current).toBeTypeOf("number");
    expect(result.current).toBe(window.innerWidth);
  });

  it("should change the maxWidth if the screen is resized", () => {
    const { rerender, result } = renderHook(() => useMaxWidth());
    act(() => setWindowSize(900, WINDOW_DEFAULT_WIDTH));
    rerender();
    expect(window.innerWidth).toBe(900);
    expect(result.current).toBe(900);
  });
});
