import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useToggleScroll from "@/hooks/useToggleScroll";

describe("useToggleScroll", () => {
  const body = document.body;
  it("should return nothing and overflowY on the body should be scroll", () => {
    const visible = false;
    const { result } = renderHook(() => useToggleScroll(visible));
    expect(result.current).toBeUndefined();
    expect(body.style.overflowY).toBe("scroll");
  });

  it("should return nothing and overflowY on the body should be hidden", () => {
    const visible = true;
    const { result } = renderHook(() => useToggleScroll(visible));
    expect(result.current).toBeUndefined();
    expect(body.style.overflowY).toBe("hidden");
  });

  it("should change the overflowY on the body each time the visible state changes", () => {
    const visible = false;
    const { result, rerender } = renderHook(
      ({ visible }: { visible: boolean }) => useToggleScroll(visible),
      {
        initialProps: { visible },
      },
    );
    expect(result.current).toBeUndefined();
    expect(body.style.overflowY).toBe("scroll");

    rerender({ visible: true });

    expect(body.style.overflowY).toBe("hidden");
  });
});
