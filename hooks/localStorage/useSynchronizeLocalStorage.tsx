import { useEffect } from "react";
import useStore from "../zustand/store";

const useSynchronizeLocalStorage = (isInitialized: boolean) => {
  const {
    progressBarDirection,
    progressBarVisibility,
    chapterPagesDisposition,
    readingDirection,
    gapOption,
  } = useStore((state) => ({
    progressBarDirection: state.progressBarDirection,
    progressBarVisibility: state.progressBarVisibility,
    chapterPagesDisposition: state.chapterPagesDisposition,
    readingDirection: state.readingDirection,
    gapOption: state.gapOption,
  }));

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        "progressBarDirection",
        JSON.stringify(progressBarDirection),
      );
    }
  }, [progressBarDirection, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        "progressBarVisibility",
        JSON.stringify(progressBarVisibility),
      );
    }
  }, [progressBarVisibility, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        "chapterPagesDisposition",
        JSON.stringify(chapterPagesDisposition),
      );
    }
  }, [chapterPagesDisposition, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(
        "readingDirection",
        chapterPagesDisposition === "Single Page"
          ? JSON.stringify(readingDirection)
          : JSON.stringify(null),
      );
    }
  }, [readingDirection, chapterPagesDisposition, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("gapOptionName", JSON.stringify(gapOption.name));
    }
  }, [gapOption.name, isInitialized]);
};

export default useSynchronizeLocalStorage;
