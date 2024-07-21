import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useStore from "../store";

const useUpdateUrlAndScrollToTop = (
  targetRefs: React.MutableRefObject<HTMLImageElement[]>,
  router: AppRouterInstance,
  pathName: string,
  newPageIndex?: number,
) => {
  const { currentPageIndex } = useStore.getState();
  const targetRefOffSet = targetRefs?.current[currentPageIndex + 1]?.offsetTop;
  const targetRefAltOffSet =
    targetRefs?.current[currentPageIndex - 1]?.offsetTop;
  window.scrollTo({
    top: (targetRefOffSet ? targetRefOffSet : targetRefAltOffSet) - 70,
    behavior: "smooth",
  });
  router.push(
    `${pathName}#page-${newPageIndex ? newPageIndex + 1 : currentPageIndex + 1}`,
    {
      scroll: false,
    },
  );
};
export default useUpdateUrlAndScrollToTop;
