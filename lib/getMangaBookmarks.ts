import { GET_MANGA_BOOKMARKS_TAG } from "./cache-keys/unstable_cache";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import getUserId from "./getUserId";
import { unstable_cache } from "next/cache";

const cachedPart = unstable_cache(
  async (userId: string, mangaSlug: string) => {
    const mangaBookmarks = await getAllMangaBookmarks(userId, mangaSlug);
    return mangaBookmarks;
  },
  [GET_MANGA_BOOKMARKS_TAG],
  { tags: [GET_MANGA_BOOKMARKS_TAG] },
);

const getMangaBookmarks = async (mangaSlug: string) => {
  const { userId } = await getUserId();

  if (!userId) {
    return;
  }
  return await cachedPart(userId, mangaSlug);
};

export default getMangaBookmarks;
