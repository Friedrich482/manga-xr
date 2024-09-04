import { getHistory } from "@/data-access/history";
import { findMangaWithSlug } from "@/data-access/manga";
import getUserId from "./getUserId";

export default async function getMangaChaptersFromHistory(altTitle: string) {
  const { userId } = await getUserId();
  if (!userId) {
    return null;
  }
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
}
