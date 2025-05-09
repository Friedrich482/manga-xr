import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import getStoredHistory from "./getStoredHistory";

const updateStoredChapters = (chapterSlug: string, page: number) => {
  const storedHistory = getStoredHistory();
  const chapterInHistory = storedHistory.find(
    (chapter) => chapter.chapterSlug === chapterSlug,
  );

  if (!chapterInHistory) {
    const newChapter = {
      chapterSlug,
      page,
    };

    const updatedHistory = [...storedHistory, newChapter];

    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(updatedHistory),
    );
    return;
  }
  chapterInHistory.page = page;

  localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(storedHistory));
};

export default updateStoredChapters;
