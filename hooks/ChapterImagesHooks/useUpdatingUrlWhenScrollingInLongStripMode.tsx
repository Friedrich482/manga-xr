import { useEffect } from "react";
import useStore from "../store";
import { usePathname, useRouter } from "next/navigation";

const useUpdatingUrlWhenScrollingInLongStripMode = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { chapterPagesDisposition, currentPageIndex } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
    currentPageIndex: state.currentPageIndex,
  }));
  useEffect(() => {
    if (chapterPagesDisposition === "Long Strip") {
      router.push(`${pathName}#page-${currentPageIndex + 1}`, {
        scroll: false,
      });
    }
  }, [currentPageIndex]);
};

export default useUpdatingUrlWhenScrollingInLongStripMode;
