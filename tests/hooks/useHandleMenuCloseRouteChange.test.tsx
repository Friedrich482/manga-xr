import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useHandleMenuCloseRouteChange from "@/hooks/useHandleMenuCloseRouteChange";
import { usePathname } from "next/navigation";

describe("useHandleMenuCloseRouteChange", () => {
  it("should isVisible to false when pathname changes", async () => {
    const setIsVisible = vi.fn();

    vi.mocked(usePathname).mockReturnValue("/initial-path");

    const { rerender } = renderHook(() =>
      useHandleMenuCloseRouteChange(setIsVisible),
    );

    expect(setIsVisible).toHaveBeenCalledWith(false);

    vi.mocked(usePathname).mockImplementation(() => "/new-path");
    rerender();

    expect(setIsVisible).toHaveBeenCalledTimes(2);
  });

  it("should not call setIsVisible if pathname doesn't change", () => {
    const setIsVisible = vi.fn();

    vi.mocked(usePathname).mockReturnValue("/same-path");

    const { rerender } = renderHook(() =>
      useHandleMenuCloseRouteChange(setIsVisible),
    );

    setIsVisible.mockClear();

    rerender();

    expect(setIsVisible).not.toHaveBeenCalled();
  });
});
