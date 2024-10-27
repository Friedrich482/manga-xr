import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { scrollToTopOffset } from "@/lib/constants";
import useStore from "@/hooks/zustand/store";

const updateUrlAndScrollToTop = (
  router: AppRouterInstance,
  pathName: string,
  newPageIndex?: number,
) => {
  const { currentPageIndex } = useStore.getState();

  window.scrollTo({
    top: scrollToTopOffset,
    behavior: "smooth",
  });
  router.push(
    `${pathName}#page-${newPageIndex ? newPageIndex + 1 : currentPageIndex + 1}`,
    {
      scroll: false,
    },
  );
};
export default updateUrlAndScrollToTop;
