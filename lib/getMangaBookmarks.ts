import { GET_MANGA_BOOKMARKS_TAG } from "./constants";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import getUserId from "./getUserId";
import { unstable_cache } from "next/cache";

const cachedPart = unstable_cache(
  async (userId: string, altTitle: string) => {
    const mangaBookmarks = await getAllMangaBookmarks(userId, altTitle);
    return mangaBookmarks;
  },
  [GET_MANGA_BOOKMARKS_TAG],
  { tags: [GET_MANGA_BOOKMARKS_TAG] },
);

const getMangaBookmarks = async (altTitle: string) => {
  const { userId } = await getUserId();

  if (!userId) {
    return;
  }
  return await cachedPart(userId, altTitle);
};

export default getMangaBookmarks;
