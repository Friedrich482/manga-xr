import { describe, expect, it, vi } from "vitest";
import { initialIsVisibleImagesArray } from "@/lib/constants";
import { renderHook } from "@testing-library/react";
import useArrayVisibilityInSinglePage from "@/hooks/chapter-images-hooks/useArrayVisibilityInSinglePage";
import { usePathname } from "next/navigation";
import useStore from "@/hooks/zustand/store";

// extract a value from the zustand store with the useStore.getState() method
//  makes it lost its reactivity

const targetRefs: React.MutableRefObject<HTMLImageElement[]> = {
  current: new Array(initialIsVisibleImagesArray.length).fill(
    document.createElement("img"),
  ),
};

describe("useArrayVisibilityInSinglePage", () => {
  const originalState = useStore.getState();

  it("should return nothing", () => {
    const { result, unmount } = renderHook(() =>
      useArrayVisibilityInSinglePage(targetRefs),
    );

    expect(result.current).toBeUndefined();
    unmount();
  });

  it("should not change the isVisibleImagesArray even if the pathname changes", () => {
    vi.mocked(usePathname).mockReturnValue("/initial-path");

    const { isVisibleImagesArray: initialValue } = useStore.getState();
    const { unmount, rerender } = renderHook(() =>
      useArrayVisibilityInSinglePage(targetRefs),
    );

    expect(initialValue).toStrictEqual(
      new Array(targetRefs.current.length).fill(false),
    );

    vi.mocked(usePathname).mockImplementation(() => "/new-path");
    rerender();

    const { isVisibleImagesArray: finalValue } = useStore.getState();

    expect(finalValue).toStrictEqual(
      new Array(targetRefs.current.length).fill(false),
    );

    unmount();
  });

  it("should change the isVisibleImagesArray when the pathname changes", async () => {
    vi.mocked(usePathname).mockReturnValue("/initial-path");

    useStore.setState({
      ...originalState,
      chapterPagesDisposition: "Single Page",
    });

    const { isVisibleImagesArray: initialValue } = useStore.getState();
    const { rerender, unmount } = renderHook(() =>
      useArrayVisibilityInSinglePage(targetRefs),
    );

    expect(initialValue).toStrictEqual(
      new Array(targetRefs.current.length).fill(false),
    );

    const { isVisibleImagesArray: finalValue } = useStore.getState();
    vi.mocked(usePathname).mockImplementation(() => "/new-path");
    rerender();

    expect(finalValue).not.toStrictEqual(
      new Array(targetRefs.current.length).map((_, index) => index === 0),
    );

    unmount();
  });
});
