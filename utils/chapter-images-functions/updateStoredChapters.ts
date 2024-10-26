import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { UserHistory } from "@/zod-schema/schema";
import getStoredHistory from "./getStoredHistory";

const updateStoredChapters = (
  mangaSlug: string,
  chapterSlug: string,
  page: number,
) => {
  const storedHistory = getStoredHistory();
  if (!storedHistory.some((manga) => manga.name === mangaSlug)) {
    const newManga = {
      name: mangaSlug,
      chapters: [{ chapterSlug, page }],
    };

    const updatedHistory: UserHistory = [...storedHistory, newManga];

    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(updatedHistory),
    );
  } else {
    const mangaInHistory = storedHistory.find(
      (manga) => manga.name === mangaSlug,
    )!;

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

export default updateStoredChapters;
