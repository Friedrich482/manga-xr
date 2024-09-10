import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useStore from "../zustand/store";

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
