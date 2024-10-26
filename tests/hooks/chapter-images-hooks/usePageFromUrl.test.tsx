import { beforeEach, describe, expect, it } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import usePageFromUrl from "@/hooks/chapter-images-hooks/usePageFromUrl";
import useStore from "@/hooks/zustand/store";

const images: string[] = new Array(10).fill("image");

const TestComponent = () => {
  usePageFromUrl(images);
  return <></>;
};

describe("usePageFromUrl", () => {
  const initialState = useStore.getState();
  beforeEach(() => {
    window.location.href = "http://localhost:3000";
    useStore.setState({ ...initialState, currentPageIndex: 0 });
  });

  it("should return initially 0 as the currentPageIndex", () => {
    const { unmount } = renderHook(() => usePageFromUrl(images));

    const currentPageIndex = useStore.getState().currentPageIndex;

    expect(currentPageIndex).toBe(0);

    unmount();
  });

  it("should return 3 as the currentPageIndex", async () => {
    const { unmount, rerender } = render(<TestComponent />);

    act(() => {
      window.location.href = `${window.location.href}#page-4`;
    });
    rerender(<TestComponent />);

    await waitFor(() => {
      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(3);
    });

    unmount();
  });

  it("should return 0 as the currentPageIndex because the hashPage is greater than the images array's length", async () => {
    const { unmount, rerender } = render(<TestComponent />);

    act(() => {
      window.location.href = `${window.location.href}#page-29`;
    });
    rerender(<TestComponent />);

    await waitFor(() => {
      const currentPageIndex = useStore.getState().currentPageIndex;
      expect(currentPageIndex).toBe(0);
    });

    unmount();
  });
});
