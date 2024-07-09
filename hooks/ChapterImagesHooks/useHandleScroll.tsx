import { useEffect, useRef } from "react";
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
  const handleScroll = () => {
    const newVisibilityState = targetRefs.current.map((img) => {
      const margin = window.innerHeight / 2;
      // this margin ensure that if the user navigates at a page, the progressbar element for that page will be activated
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
    setCurrentPageIndex(newVisibilityState.indexOf(true));
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Initial check on component mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // use effect to make sure that the element of the progress bar is activated once we are on a new page when it is a single page disposition
  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      handleScroll();
    }
  }, [currentPageIndex]);

  return targetRefs;
};

export default useHandleScroll;
