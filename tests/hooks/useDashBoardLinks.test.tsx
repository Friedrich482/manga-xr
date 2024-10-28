import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useDashBoardLinks from "@/hooks/useDashBoardLinks";
import useMaxWidth from "@/hooks/useMaxWidth";

vi.mock("../../hooks/useMaxWidth");

describe("useDashBoardLinks", () => {
  const mockUseMaxWidth = vi.mocked(useMaxWidth);

  it("should return an object containing windowWidth and linksToDisplay", () => {
    mockUseMaxWidth.mockReturnValue(window.innerWidth);
    const { result } = renderHook(() => useDashBoardLinks());

    expect(mockUseMaxWidth).toHaveBeenCalled();

    expect(result.current.windowWidth).toBeDefined();
    expect(result.current.windowWidth).toBeTypeOf("number");
    expect(result.current.linksToDisplay).toBeDefined();
    expect(result.current.linksToDisplay).toBeTypeOf("number");
  });

  it("should return 0 if the windowWidth is less than the average width of a link", () => {
    mockUseMaxWidth.mockReturnValue(800);
    const { rerender, result: dashboardResult } = renderHook(() =>
      useDashBoardLinks(),
    );

    expect(mockUseMaxWidth).toHaveBeenCalled();

    expect(dashboardResult.current.linksToDisplay).toBe(3);

    mockUseMaxWidth.mockReturnValue(100);
    rerender();

    expect(dashboardResult.current.windowWidth).toBe(100);
    expect(dashboardResult.current.linksToDisplay).toBe(0);
  });
});
