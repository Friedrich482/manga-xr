import { useEffect, useRef, useCallback } from "react";
import useStore from "../store";

const useHandleScroll = () => {
  const targetRefs = useRef<HTMLImageElement[]>([]);
  const {
    setIsVisibleImagesArray,
    currentPageIndex,
    setCurrentPageIndex,
    chapterPagesDisposition,
  } = useStore((state) => ({
    setIsVisibleImagesArray: state.setIsVisibleImagesArray,
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));

  const handleScroll = useCallback(() => {
    const newVisibilityState = targetRefs.current.map((img) => {
      const margin = window.innerHeight / 2;
      const rect = img?.getBoundingClientRect();
      const isVerticallyVisible =
        rect !== undefined &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) +
            margin &&
        rect.bottom - margin >= 0;
      return isVerticallyVisible;
    });
    setIsVisibleImagesArray(newVisibilityState);
    const trueIndex = newVisibilityState.indexOf(true);
    setCurrentPageIndex(trueIndex === -1 ? 0 : trueIndex);
  }, [setIsVisibleImagesArray, setCurrentPageIndex]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Ensure the progress bar element is activated once on a new page in single page disposition
  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      handleScroll();
    }
  }, [chapterPagesDisposition, currentPageIndex, handleScroll]);

  return targetRefs;
};

export default useHandleScroll;
