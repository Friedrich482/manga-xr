import { Manga, UserHistory } from "@/zod-schema/schema";
import { useEffect, useMemo } from "react";
import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";
import { useParams } from "next/navigation";
import useStore from "../zustand/store";
import useUser from "../auth/useUser";

const updateStoredChapters = (
  mangaSlug: string,
  chapterSlug: string,
  page: number,
) => {
  const storedHistory = getStoredHistory();
  if (!storedHistory.some((manga) => manga.name === mangaSlug)) {
    const newManga: Manga = {
      name: mangaSlug,
      chapters: [{ chapterSlug, page }],
    };
    const updatedHistory: UserHistory = [...storedHistory, newManga];
    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(updatedHistory),
    );
  } else {
    const mangaInHistory = storedHistory.filter(
      (manga) => manga.name === mangaSlug,
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
    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(storedHistory),
    );
  }
};

// the hook itself
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
