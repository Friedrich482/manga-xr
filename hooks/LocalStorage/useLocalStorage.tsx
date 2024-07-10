import { useEffect } from "react";
import useStore from "../store";

const useLocalStorage = () => {
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
    localStorage.setItem(
      "progressBarDirection",
      JSON.stringify(progressBarDirection),
    );
  }, [progressBarDirection]);

  useEffect(() => {
    localStorage.setItem(
      "progressBarVisibility",
      JSON.stringify(progressBarVisibility),
    );
  }, [progressBarVisibility]);

  useEffect(() => {
    localStorage.setItem(
      "chapterPagesDisposition",
      JSON.stringify(chapterPagesDisposition),
    );
  }, [chapterPagesDisposition]);
  useEffect(() => {
    localStorage.setItem(
      "readingDirection",
      chapterPagesDisposition === "Single Page"
        ? JSON.stringify(readingDirection)
        : JSON.stringify(null),
    );
  }, [readingDirection, chapterPagesDisposition]);
};

export default useLocalStorage;
