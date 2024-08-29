import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useStore from "../store";
import getStoredHistory from "@/utils/ChapterImagesFunctions/getStoredHistory";
import useUser from "../Auth/useUser";

const useInitializePageFromHistory = (isInitialized: boolean) => {
  const router = useRouter();
  const pathName = usePathname();
  const setCurrentPageIndex = useStore((state) => state.setCurrentPageIndex);
  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const { user } = useUser();
  useEffect(() => {
    const storedHistory = getStoredHistory();
    if (
      storedHistory.length > 0 &&
      storedHistory.filter((manga) => manga.name === altTitle).length > 0 &&
      user &&
      isInitialized
      //   checks if the manga is in the history
    ) {
      const pageOfChapterInHistory = storedHistory
        .filter((manga) => manga.name === altTitle)[0]
        ?.chapters.filter(
          (chapter) => chapter.chapterSlug === chapterSlug,
        )[0]?.page;
      router.push(
        `${pathName}#page-${pageOfChapterInHistory ? pageOfChapterInHistory : 1}`,
        { scroll: true },
      );
      setCurrentPageIndex(
        pageOfChapterInHistory ? pageOfChapterInHistory - 1 : 0,
      );
      return;
    }
    router.push(`${pathName}#page-1`, { scroll: true });
    setCurrentPageIndex(0);
  }, [pathName, isInitialized, user]);
};
export default useInitializePageFromHistory;
