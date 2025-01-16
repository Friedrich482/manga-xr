import { useParams, usePathname, useRouter } from "next/navigation";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";
import { useEffect } from "react";
import useStore from "../zustand/store";
import useUser from "../auth/useUser";

const useInitializePageFromHistory = (isInitialized: boolean) => {
  const router = useRouter();
  const pathName = usePathname();
  const setCurrentPageIndex = useStore((state) => state.setCurrentPageIndex);
  const { chapterSlug }: { chapterSlug: string } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const storedHistory = getStoredHistory();
    const isChapterInHistory = storedHistory.find(
      (chapter) => chapter.chapterSlug === chapterSlug,
    );
    if (
      storedHistory.length > 0 &&
      isChapterInHistory &&
      user &&
      isInitialized
      //   checks if the manga is in the history
    ) {
      const pageOfChapter = isChapterInHistory.page;

      router.push(`${pathName}#page-${pageOfChapter}`, { scroll: true });
      setCurrentPageIndex(pageOfChapter - 1);
      return;
    }
    router.push(`${pathName}#page-1`, { scroll: true });
    setCurrentPageIndex(0);
  }, [pathName, isInitialized, user]);
};
export default useInitializePageFromHistory;
