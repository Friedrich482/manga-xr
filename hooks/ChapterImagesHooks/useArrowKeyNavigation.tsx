import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import updateUrlAndScrollToTop from "@/utils/ChapterImagesFunctions/updateUrlAndScrollToTop";
import { useEffect } from "react";
import useStore from "../zustand/store";

const arrowKeyNavigation = (
  event: KeyboardEvent,
  targetRefs: React.MutableRefObject<HTMLImageElement[]>,
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
      updateUrlAndScrollToTop(targetRefs, router, pathName);
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
      updateUrlAndScrollToTop(targetRefs, router, pathName);
    }
  }
};

const useArrowKeyNavigation = (
  targetRefs: React.MutableRefObject<HTMLImageElement[]>,
  images: string[],
) => {
  const { chapterPagesDisposition } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  const router = useRouter();
  const pathName = usePathname();

  const handleKeyDown = (e: KeyboardEvent) => {
    arrowKeyNavigation(e, targetRefs, images, router, pathName);
  };

  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [chapterPagesDisposition]);
};

export default useArrowKeyNavigation;
