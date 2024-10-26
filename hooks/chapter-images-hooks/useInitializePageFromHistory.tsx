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
      storedHistory.some((manga) => manga.name === mangaSlug) &&
      user &&
      isInitialized
      //   checks if the manga is in the history
    ) {
      const pageOfChapterInHistory = storedHistory
        .find((manga) => manga.name === mangaSlug)
        ?.chapters.find((chapter) => chapter.chapterSlug === chapterSlug)?.page;

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
