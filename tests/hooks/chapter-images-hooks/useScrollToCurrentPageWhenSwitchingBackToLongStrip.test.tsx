import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useScrollToCurrentPageWhenSwitchingBackToLongStrip from "@/hooks/chapter-images-hooks/useScrollToCurrentPageWhenSwitchingBackToLongStrip";
import useStore from "@/hooks/zustand/store";

const mockedUseRouterPush = vi.fn();

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: mockedUseRouterPush,
    }),
    usePathname: vi.fn(),
  };
});

describe("useScrollToCurrentPageWhenSwitchingBackToLongStrip", () => {
  const initialState = useStore.getState();
  beforeEach(() => {
    useStore.setState({ ...initialState, currentPageIndex: 0 });
    vi.clearAllMocks();
  });

  it("should call useRouter", () => {
    const { unmount } = renderHook(() =>
      useScrollToCurrentPageWhenSwitchingBackToLongStrip(),
    );

    expect(mockedUseRouterPush).toHaveBeenCalled();

    unmount();
  });

  it("should not call useRouter", () => {
    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });

    const { unmount } = renderHook(() =>
      useScrollToCurrentPageWhenSwitchingBackToLongStrip(),
    );

    expect(mockedUseRouterPush).not.toHaveBeenCalled();

    unmount();
  });

  it("should call useRouter only once", () => {
    const { unmount, rerender } = renderHook(() =>
      useScrollToCurrentPageWhenSwitchingBackToLongStrip(),
    );

    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });

    rerender();
    expect(mockedUseRouterPush).toHaveBeenCalledOnce();
    unmount();
  });
});
