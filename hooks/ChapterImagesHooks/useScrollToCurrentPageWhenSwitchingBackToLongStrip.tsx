import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "../zustand/store";

const useScrollToCurrentPageWhenSwitchingBackToLongStrip = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { chapterPagesDisposition, currentPageIndex } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
    currentPageIndex: state.currentPageIndex,
  }));
  useEffect(() => {
    if (chapterPagesDisposition === "Long Strip") {
      router.push(`${pathName}#page-${currentPageIndex + 1}`, {
        scroll: true,
      });
    }
  }, [chapterPagesDisposition]);
};

export default useScrollToCurrentPageWhenSwitchingBackToLongStrip;
