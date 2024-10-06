import { useParams, usePathname, useRouter } from "next/navigation";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";
import { useEffect } from "react";
import useStore from "../zustand/store";
import useUser from "../auth/useUser";

const useInitializePageFromHistory = (isInitialized: boolean) => {
  const router = useRouter();
  const pathName = usePathname();
  const setCurrentPageIndex = useStore((state) => state.setCurrentPageIndex);
  const { mangaSlug, chapterSlug }: { mangaSlug: string; chapterSlug: string } =
    useParams();
  const { user } = useUser();
  useEffect(() => {
    const storedHistory = getStoredHistory();
    if (
      storedHistory.length > 0 &&
      storedHistory.filter((manga) => manga.name === mangaSlug).length > 0 &&
      user &&
      isInitialized
      //   checks if the manga is in the history
    ) {
      const pageOfChapterInHistory = storedHistory
        .filter((manga) => manga.name === mangaSlug)[0]
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
