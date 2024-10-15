import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { renderHook } from "@testing-library/react";
import useDashBoardLinks from "@/hooks/useDashBoardLinks";
import useMaxWidth from "@/hooks/useMaxWidth";

describe("useDashBoardLinks", () => {
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

  it("should return an object containing windowWidth and linksToDisplay", () => {
    const { result } = renderHook(() => useDashBoardLinks());

    expect(result.current.windowWidth).toBeDefined();
    expect(result.current.windowWidth).toBeTypeOf("number");
    expect(result.current.linksToDisplay).toBeDefined();
    expect(result.current.linksToDisplay).toBeTypeOf("number");
  });

  it("should trigger the useEffect at the first render and each time the windowWidth changes", () => {
    const { rerender: rerenderDashboard, result: dashboardResult } = renderHook(
      () => useDashBoardLinks(),
    );
    const { rerender: rerenderMaxWidth, result: maxWidthResult } = renderHook(
      () => useMaxWidth(),
    );

    // Initial state
    expect(dashboardResult.current.linksToDisplay).toBe(3);
    expect(maxWidthResult.current).toBe(window.innerWidth);

    setWindowSize(400, 600);

    rerenderMaxWidth();
    rerenderDashboard();

    // Check updated values
    expect(maxWidthResult.current).toBe(400);
    expect(dashboardResult.current.windowWidth).toBe(400);
    expect(dashboardResult.current.linksToDisplay).toBe(2);
  });

  it("should return 0 if the windowWidth is less than the average width of a link", () => {
    const { rerender: rerenderDashboard, result: dashboardResult } = renderHook(
      () => useDashBoardLinks(),
    );
    const { rerender: rerenderMaxWidth, result: maxWidthResult } = renderHook(
      () => useMaxWidth(),
    );

    // Initial state
    expect(dashboardResult.current.linksToDisplay).toBe(3);
    expect(maxWidthResult.current).toBe(window.innerWidth);

    setWindowSize(100, 600);

    rerenderMaxWidth();
    rerenderDashboard();

    // Check updated values
    expect(maxWidthResult.current).toBe(100);
    expect(dashboardResult.current.windowWidth).toBe(100);
    expect(dashboardResult.current.linksToDisplay).toBe(0);
  });
});
