import { useEffect } from "react";
import useStore from "../store";

const useSynchronizeLocalStorage = (isInitialized: boolean) => {
  const {
    progressBarDirection,
    progressBarVisibility,
    chapterPagesDisposition,
    readingDirection,
  } = useStore((state) => ({
    progressBarDirection: state.progressBarDirection,
    progressBarVisibility: state.progressBarVisibility,
    chapterPagesDisposition: state.chapterPagesDisposition,
    readingDirection: state.readingDirection,
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
};

export default useSynchronizeLocalStorage;
