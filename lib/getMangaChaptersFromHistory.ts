import { GET_MANGA_CHAPTERS_FROM_HISTORY_TAG } from "./cache-keys/unstable_cache";
import { findMangaWithSlug } from "@/data-access/manga";
import { getHistory } from "@/data-access/history";
import getUserId from "./getUserId";
import { unstable_cache } from "next/cache";

const cachedPart = unstable_cache(
  async (userId: string, mangaSlug: string) => {
    const history = await getHistory(userId);
    if (history) {
      const { id: historyId } = history;
      const chaptersFromHistory = await findMangaWithSlug({
        slug: mangaSlug,
        historyId,
      });
      return chaptersFromHistory;
    }
    return null;
  },
  [GET_MANGA_CHAPTERS_FROM_HISTORY_TAG],
  { tags: [GET_MANGA_CHAPTERS_FROM_HISTORY_TAG] },
);

export default async function getMangaChaptersFromHistory(mangaSlug: string) {
  const { userId } = await getUserId();
  if (!userId) {
    return null;
  }
  return await cachedPart(userId, mangaSlug);
}
