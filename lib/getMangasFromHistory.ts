import { GET_MANGAS_FROM_HISTORY } from "@/lib/constants";
import { findUserSManga } from "@/data-access/manga";
import { unstable_cache } from "next/cache";

const getMangaFromHistory = unstable_cache(
  async (historyId: string) => {
    const mangasInHistory = await findUserSManga(historyId);
    return mangasInHistory;
  },
  [GET_MANGAS_FROM_HISTORY],
  { tags: [GET_MANGAS_FROM_HISTORY] },
);

export default getMangaFromHistory;
