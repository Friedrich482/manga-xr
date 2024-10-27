import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CursorClass } from "@/zod-schema/schema";
import updateUrlAndScrollToTop from "./updateUrlAndScrollToTop";
import useStore from "@/hooks/zustand/store";

const handleSinglePageNavigation = (
  cursorClass: CursorClass,
  images: string[],
  router: AppRouterInstance,
  pathName: string,
) => {
  const { readingDirection, currentPageIndex, setCurrentPageIndex } =
    useStore.getState();

  const newPageIndex = (() => {
    if (readingDirection === "From left to right") {
      if (
        cursorClass === "cursor-right" &&
        currentPageIndex < images.length - 1
      ) {
        return currentPageIndex + 1;
      }
      if (cursorClass === "cursor-left" && currentPageIndex > 0) {
        return currentPageIndex - 1;
      }
    } else {
      if (cursorClass === "cursor-right" && currentPageIndex > 0) {
        return currentPageIndex - 1;
      }
      if (
        cursorClass === "cursor-left" &&
        currentPageIndex < images.length - 1
      ) {
        return currentPageIndex + 1;
      }
    }
    return currentPageIndex;
  })();

  if (newPageIndex !== currentPageIndex) {
    setCurrentPageIndex(newPageIndex);
    updateUrlAndScrollToTop(router, pathName, newPageIndex);
  }
};

export default handleSinglePageNavigation;
