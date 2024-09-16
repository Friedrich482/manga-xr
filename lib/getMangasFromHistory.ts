import { GET_MANGAS_FROM_HISTORY_TAG } from "./cache-keys/unstable_cache";
import { findUserSManga } from "@/data-access/manga";
import { unstable_cache } from "next/cache";

const getMangaFromHistory = unstable_cache(
  async (historyId: string) => {
    const mangasInHistory = await findUserSManga(historyId);
    return mangasInHistory;
  },
  [GET_MANGAS_FROM_HISTORY_TAG],
  { tags: [GET_MANGAS_FROM_HISTORY_TAG] },
);

export default getMangaFromHistory;
