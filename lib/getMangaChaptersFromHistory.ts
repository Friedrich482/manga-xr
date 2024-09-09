import { GET_MANGA_CHAPTERS_FROM_HISTORY_TAG } from "./constants";
import { findMangaWithSlug } from "@/data-access/manga";
import { getHistory } from "@/data-access/history";
import getUserId from "./getUserId";
import { unstable_cache } from "next/cache";

const cachedPart = unstable_cache(
  async (userId: string, altTitle: string) => {
    const history = await getHistory(userId);
    if (history) {
      const { id: historyId } = history;
      const chaptersFromHistory = await findMangaWithSlug({
        slug: altTitle,
        historyId,
      });
      return chaptersFromHistory;
    }
    return null;
  },
  [GET_MANGA_CHAPTERS_FROM_HISTORY_TAG],
  { tags: [GET_MANGA_CHAPTERS_FROM_HISTORY_TAG] },
);

export default async function getMangaChaptersFromHistory(altTitle: string) {
  const { userId } = await getUserId();
  if (!userId) {
    return null;
  }
  return await cachedPart(userId, altTitle);
}
