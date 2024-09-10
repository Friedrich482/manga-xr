import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useStore from "../zustand/store";

const useHandleScroll = () => {
  const targetRefs = useRef<HTMLImageElement[]>([]);
  const router = useRouter();
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
    router.push(`#page-${trueIndex + 1}`, { scroll: false });
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleScroll();
      }, 300);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("scroll", onScroll);
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
