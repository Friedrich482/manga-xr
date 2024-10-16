import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTheme } from "next-themes";
import useToastTheme from "@/hooks/useToastTheme";

describe("useToastTheme", () => {
  it("should return the light theme object", () => {
    const { result } = renderHook(() => useToastTheme());
    expect(result.current).toBeDefined();
    expect(result.current.style).toStrictEqual({
      background: "rgb(15,15, 15)",
      color: "#ffffff",
    });
  });

  it("should return the dark theme object", () => {
    vi.mocked(useTheme).mockReturnValue({
      ...useTheme(),
      resolvedTheme: "dark",
    });
    const { result } = renderHook(() => useToastTheme());
    expect(result.current).toBeDefined();
    expect(result.current.style).toStrictEqual({
      background: "rgb(247, 247, 247)",
      color: "#000000",
    });
  });

  it("should return the light theme object & duration", () => {
    const { result } = renderHook(() => useToastTheme(5000));
    expect(result.current).toBeDefined();
    expect(result.current.duration).toStrictEqual(5000);
  });
});
