import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import useStore from "../store";
import useUser from "../Auth/useUser";

type Chapter = {
  chapterSlug: string;
  page: number;
};

type Manga = { name: string; chapters: Chapter[] };

type UserHistory = Manga[];
const historyLocalStorageKey = "userReadingHistory";

const getStoredHistory = (): UserHistory => {
  try {
    const storedData = localStorage.getItem(historyLocalStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    return [];
  }
};

const updateStoredChapters = (
  altTitle: string,
  chapterSlug: string,
  page: number,
) => {
  const storedHistory = getStoredHistory();
  if (!storedHistory.some((manga) => manga.name === altTitle)) {
    const newManga: Manga = {
      name: altTitle,
      chapters: [{ chapterSlug, page }],
    };
    const updatedHistory: UserHistory = [...storedHistory, newManga];
    localStorage.setItem(
      historyLocalStorageKey,
      JSON.stringify(updatedHistory),
    );
  } else {
    const mangaInHistory = storedHistory.filter(
      (manga) => manga.name === altTitle,
    )[0];
    if (
      !mangaInHistory.chapters.some(
        (chapter) => chapter.chapterSlug === chapterSlug,
      )
    ) {
      mangaInHistory.chapters.push({ chapterSlug, page });
    } else {
      mangaInHistory.chapters.forEach((chapter) => {
        if (chapter.chapterSlug === chapterSlug) {
          chapter.page = page;
        }
      });
    }
    localStorage.setItem(historyLocalStorageKey, JSON.stringify(storedHistory));
  }
};

// the hook itself
const useLastPageRead = (isInitialized: boolean) => {
  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const { user } = useUser();
  const currentPageIndex = useStore((state) => state.currentPageIndex);

  const page = useMemo(() => currentPageIndex + 1, [currentPageIndex]) || 1;
  useEffect(() => {
    if (user && isInitialized) {
      updateStoredChapters(altTitle, chapterSlug, page);
    }
  }, [chapterSlug, altTitle, isInitialized, page]);
};
export default useLastPageRead;
