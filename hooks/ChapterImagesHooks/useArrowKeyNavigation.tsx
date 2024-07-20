import { useEffect } from "react";
import useStore from "../store";
import useUpdateUrlAndScrollToTop from "./useUpdateUrlAndScrollToTop";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
        useUpdateUrlAndScrollToTop(targetRefs, router, pathName);
      } else if (
        readingDirection === "From right to left" &&
        currentPageIndex !== images.length - 1
      ) {
        setCurrentPageIndex(currentPageIndex + 1);
        useUpdateUrlAndScrollToTop(targetRefs, router, pathName);
      }
    } else {
      if (
        readingDirection === "From left to right" &&
        currentPageIndex !== images.length - 1
      ) {
        setCurrentPageIndex(currentPageIndex + 1);
        useUpdateUrlAndScrollToTop(targetRefs, router, pathName);
      } else if (
        readingDirection === "From right to left" &&
        currentPageIndex !== 0
      ) {
        setCurrentPageIndex(currentPageIndex - 1);
        useUpdateUrlAndScrollToTop(targetRefs, router, pathName);
      }
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
  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      window.addEventListener("keydown", (e) => {
        arrowKeyNavigation(e, targetRefs, images, router, pathName);
      });

      return () => {
        window.removeEventListener("keydown", (e) => {
          arrowKeyNavigation(e, targetRefs, images, router, pathName);
        });
      };
    }
  }, [chapterPagesDisposition]);
};

export default useArrowKeyNavigation;
