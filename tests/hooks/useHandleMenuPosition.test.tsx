import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";

describe("group", () => {
  it("should return 'bottom of the button'", () => {
    const { result } = renderHook(() => useHandleMenuPosition(0));
    expect(result.current).toBe("bottom of the button");
  });

  it("should return 'top of the button'", () => {
    const { result } = renderHook(() => useHandleMenuPosition(500));
    expect(result.current).toBe("top of the button");
  });

  it("should run the useEffect when the button position changes", () => {
    const { result, rerender } = renderHook(
      ({ buttonPosition }: { buttonPosition: number }) =>
        useHandleMenuPosition(buttonPosition),
      { initialProps: { buttonPosition: 0 } },
    );
    rerender({ buttonPosition: 600 });

    expect(result.current).toBe("top of the button");
  });
});
