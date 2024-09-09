import { useEffect } from "react";
import useStore from "../zustand/store";
import { usePathname } from "next/navigation";

const useArrayVisibilityInSinglePage = (
  targetRefs: React.MutableRefObject<HTMLImageElement[]>,
) => {
  const pathName = usePathname();
  const {
    chapterPagesDisposition,
    setIsVisibleImagesArray,
    setCurrentPageIndex,
  } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
    setIsVisibleImagesArray: state.setIsVisibleImagesArray,
    setCurrentPageIndex: state.setCurrentPageIndex,
  }));
  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      const initialVisibilityArray = targetRefs.current.map(
        (_, index) => index === 0,
      );
      setIsVisibleImagesArray(initialVisibilityArray);
    }
  }, [pathName, setIsVisibleImagesArray, setCurrentPageIndex]);
};
export default useArrayVisibilityInSinglePage;
