import { beforeEach, describe, expect, it } from "vitest";
import { PreferencesNames } from "@/zod-schema/schema";
import { renderHook } from "@testing-library/react";
import useStore from "@/hooks/zustand/store";
import useSynchronizeLocalStorage from "@/hooks/localStorage/useSynchronizeLocalStorage";

const getElementFromLocalStorage = (key: PreferencesNames) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

describe("useSynchronizeLocalStorage", () => {
  const initialState = useStore.getState();

  beforeEach(() => {
    useStore.setState(initialState);
    localStorage.clear();
  });

  it("should do nothing", () => {
    const { unmount } = renderHook(() => useSynchronizeLocalStorage(false));

    const progressBarDirectionFromLocalStorage = getElementFromLocalStorage(
      "progressBarDirection",
    );
    const progressVisibilityFromLocalStorage = getElementFromLocalStorage(
      "progressBarVisibility",
    );
    const chapterPagesDispositionFromLocalStorage = getElementFromLocalStorage(
      "chapterPagesDisposition",
    );
    const readingDirectionFromLocalStorage =
      getElementFromLocalStorage("readingDirection");
    const gapOptionNameFromLocalStorage =
      getElementFromLocalStorage("gapOptionName");

    expect(progressBarDirectionFromLocalStorage).toBeNull();
    expect(progressVisibilityFromLocalStorage).toBeNull();
    expect(chapterPagesDispositionFromLocalStorage).toBeNull();
    expect(readingDirectionFromLocalStorage).toBeNull();
    expect(gapOptionNameFromLocalStorage).toBeNull();

    unmount();
  });

  it("should get preferences from localstorage equal to preferences of the store but null as readingDirection", () => {
    const { unmount } = renderHook(() => useSynchronizeLocalStorage(true));

    const {
      progressBarDirection,
      progressBarVisibility,
      chapterPagesDisposition,
    } = useStore.getState();

    const progressBarDirectionFromLocalStorage = getElementFromLocalStorage(
      "progressBarDirection",
    );
    const progressVisibilityFromLocalStorage = getElementFromLocalStorage(
      "progressBarVisibility",
    );
    const chapterPagesDispositionFromLocalStorage = getElementFromLocalStorage(
      "chapterPagesDisposition",
    );
    const readingDirectionFromLocalStorage =
      getElementFromLocalStorage("readingDirection");
    const gapOptionNameFromLocalStorage =
      getElementFromLocalStorage("gapOptionName");

    expect(progressBarDirectionFromLocalStorage).toBe(progressBarDirection);
    expect(progressVisibilityFromLocalStorage).toBe(progressBarVisibility);
    expect(chapterPagesDispositionFromLocalStorage).toBe(
      chapterPagesDisposition,
    );
    expect(readingDirectionFromLocalStorage).toBe(null);
    expect(gapOptionNameFromLocalStorage).toBe("No gap");

    unmount();
  });

  it("should get preferences from localstorage equal to preferences of the store", () => {
    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });

    const { unmount } = renderHook(() => useSynchronizeLocalStorage(true));

    const {
      progressBarDirection,
      progressBarVisibility,
      chapterPagesDisposition,
      readingDirection,
      gapOption: { name: gapOptionName },
    } = useStore.getState();

    const progressBarDirectionFromLocalStorage = getElementFromLocalStorage(
      "progressBarDirection",
    );
    const progressVisibilityFromLocalStorage = getElementFromLocalStorage(
      "progressBarVisibility",
    );
    const chapterPagesDispositionFromLocalStorage = getElementFromLocalStorage(
      "chapterPagesDisposition",
    );
    const readingDirectionFromLocalStorage =
      getElementFromLocalStorage("readingDirection");
    const gapOptionNameFromLocalStorage =
      getElementFromLocalStorage("gapOptionName");

    expect(progressBarDirectionFromLocalStorage).toBe(progressBarDirection);
    expect(progressVisibilityFromLocalStorage).toBe(progressBarVisibility);
    expect(chapterPagesDispositionFromLocalStorage).toBe(
      chapterPagesDisposition,
    );
    expect(readingDirectionFromLocalStorage).toBe(readingDirection);
    expect(gapOptionNameFromLocalStorage).toBe(gapOptionName);

    unmount();
  });

  it("should change the values of the localstorage if they change in the store", () => {
    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Single Page",
    });

    const { unmount, rerender } = renderHook(() =>
      useSynchronizeLocalStorage(true),
    );

    const {
      progressBarDirection: initialProgressBarDirection,
      progressBarVisibility: initialProgressBarVisibility,
      chapterPagesDisposition: initialChapterPagesDisposition,
      readingDirection: initialReadingDirection,
      gapOption: { name: initialGapOptionName },
    } = useStore.getState();

    let progressBarDirectionFromLocalStorage = getElementFromLocalStorage(
      "progressBarDirection",
    );
    let progressVisibilityFromLocalStorage = getElementFromLocalStorage(
      "progressBarVisibility",
    );
    let chapterPagesDispositionFromLocalStorage = getElementFromLocalStorage(
      "chapterPagesDisposition",
    );
    let readingDirectionFromLocalStorage =
      getElementFromLocalStorage("readingDirection");
    let gapOptionNameFromLocalStorage =
      getElementFromLocalStorage("gapOptionName");

    expect(progressBarDirectionFromLocalStorage).toBe(
      initialProgressBarDirection,
    );
    expect(progressVisibilityFromLocalStorage).toBe(
      initialProgressBarVisibility,
    );
    expect(chapterPagesDispositionFromLocalStorage).toBe(
      initialChapterPagesDisposition,
    );
    expect(readingDirectionFromLocalStorage).toBe(initialReadingDirection);
    expect(gapOptionNameFromLocalStorage).toBe(initialGapOptionName);

    useStore.setState({
      ...initialState,
      chapterPagesDisposition: "Long Strip",
      progressBarDirection: "Vertical",
      progressBarVisibility: false,
      readingDirection: "From right to left",
      gapOption: { name: "Small", value: "0.5rem" },
    });

    rerender();

    const {
      progressBarDirection: finalProgressBarDirection,
      progressBarVisibility: finalProgressBarVisibility,
      chapterPagesDisposition: finalChapterPagesDisposition,
      gapOption: { name: finalGapOptionName },
    } = useStore.getState();

    progressBarDirectionFromLocalStorage = getElementFromLocalStorage(
      "progressBarDirection",
    );
    progressVisibilityFromLocalStorage = getElementFromLocalStorage(
      "progressBarVisibility",
    );
    chapterPagesDispositionFromLocalStorage = getElementFromLocalStorage(
      "chapterPagesDisposition",
    );
    readingDirectionFromLocalStorage =
      getElementFromLocalStorage("readingDirection");
    gapOptionNameFromLocalStorage = getElementFromLocalStorage("gapOptionName");

    expect(progressBarDirectionFromLocalStorage).toBe(
      finalProgressBarDirection,
    );
    expect(progressVisibilityFromLocalStorage).toBe(finalProgressBarVisibility);
    expect(chapterPagesDispositionFromLocalStorage).toBe(
      finalChapterPagesDisposition,
    );
    expect(readingDirectionFromLocalStorage).toBe(null);
    expect(gapOptionNameFromLocalStorage).toBe(finalGapOptionName);

    unmount();
  });
});
