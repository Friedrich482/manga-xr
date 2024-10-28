import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import updateUrlAndScrollToTop from "@/utils/chapter-images-functions/updateUrlAndScrollToTop";
import useStore from "@/hooks/zustand/store";

const arrowKeyNavigation = (
  event: KeyboardEvent,
  images: string[],
  router: AppRouterInstance,
  pathName: string,
) => {
  const { currentPageIndex, setCurrentPageIndex, readingDirection } =
    useStore.getState();

  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    if (event.key === "ArrowLeft") {
      if (readingDirection === "From left to right" && currentPageIndex !== 0) {
        setCurrentPageIndex(currentPageIndex - 1);
      } else if (
        readingDirection === "From right to left" &&
        currentPageIndex !== images.length - 1
      ) {
        setCurrentPageIndex(currentPageIndex + 1);
      }
      updateUrlAndScrollToTop(router, pathName);
    } else {
      if (
        readingDirection === "From left to right" &&
        currentPageIndex !== images.length - 1
      ) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else if (
        readingDirection === "From right to left" &&
        currentPageIndex !== 0
      ) {
        setCurrentPageIndex(currentPageIndex - 1);
      }
      updateUrlAndScrollToTop(router, pathName);
    }
  }
};

export default arrowKeyNavigation;
