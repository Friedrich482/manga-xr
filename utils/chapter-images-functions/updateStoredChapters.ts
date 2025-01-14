import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { UserHistory } from "@/zod-schema/schema";
import getStoredHistory from "./getStoredHistory";

const updateStoredChapters = (chapterSlug: string, page: number) => {
  const storedHistory = getStoredHistory();
  const chapterInHistory = storedHistory.find(
    (chapter) => chapter.chapterSlug === chapterSlug,
  );

  if (!chapterInHistory) {
    const newChapter: UserHistory[0] = {
      chapterSlug,
      page,
    };

    const updatedHistory: UserHistory = [...storedHistory, newChapter];

    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(updatedHistory),
    );
  } else {
    chapterInHistory.page = page;

    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(storedHistory),
    );
  }
};

export default updateStoredChapters;
