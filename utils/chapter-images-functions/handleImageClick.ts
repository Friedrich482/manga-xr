import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CursorClass } from "@/zod-schema/schema";
import updateUrlAndScrollToTop from "./updateUrlAndScrollToTop";
import useStore from "@/hooks/zustand/store";

const handleImageClick = (
  cursorClass: CursorClass,
  router: AppRouterInstance,
  images: string[],
  targetRefs: React.MutableRefObject<HTMLImageElement[]>,
  pathName: string,
) => {
  const { chapterPagesDisposition } = useStore.getState();
  const viewportHeight = window.outerHeight;
  const isLongStrip = chapterPagesDisposition === "Long Strip";
  const isSinglePage = chapterPagesDisposition === "Single Page";

  const scrollByAmount = (viewportHeight * 2) / 3;

  if (isLongStrip) {
    handleLongStripScroll(scrollByAmount, cursorClass);
  } else if (isSinglePage) {
    handleSinglePageNavigation(
      cursorClass,
      images,
      targetRefs,
      router,
      pathName,
    );
  }
};

const handleLongStripScroll = (
  scrollByAmount: number,
  cursorClass: CursorClass,
) => {
  const scrollDirection = cursorClass === "cursor-up" ? -1 : 1;
  window.scrollBy({
    top: scrollByAmount * scrollDirection,
    behavior: "smooth",
  });
};
const handleSinglePageNavigation = (
  cursorClass: CursorClass,
  images: string[],
  targetRefs: React.MutableRefObject<HTMLImageElement[]>,
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
    updateUrlAndScrollToTop(targetRefs, router, pathName, newPageIndex);
  }
};

export default handleImageClick;