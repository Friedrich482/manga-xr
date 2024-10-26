import { useEffect, useMemo } from "react";
import updateStoredChapters from "@/utils/chapter-images-functions/updateStoredChapters";
import { useParams } from "next/navigation";
import useStore from "../zustand/store";
import useUser from "../auth/useUser";

const useLastPageRead = (isInitialized: boolean) => {
  const { mangaSlug, chapterSlug }: { mangaSlug: string; chapterSlug: string } =
    useParams();
  const { user } = useUser();
  const currentPageIndex = useStore((state) => state.currentPageIndex);

  const page = useMemo(() => currentPageIndex + 1, [currentPageIndex]) || 1;
  useEffect(() => {
    if (user && isInitialized) {
      updateStoredChapters(mangaSlug, chapterSlug, page);
    }
  }, [chapterSlug, mangaSlug, isInitialized, page]);
};
export default useLastPageRead;
