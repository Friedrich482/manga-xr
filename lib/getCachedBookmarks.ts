import { GET_BOOKMARKS_TAG } from "./cache-keys/unstable_cache";
import { getAllBookmarks } from "@/data-access/bookmarks";
import getUserId from "./getUserId";
import { unstable_cache } from "next/cache";

const cachedPart = unstable_cache(
  async (userId: string) => {
    const bookmarks = await getAllBookmarks(userId);
    return bookmarks;
  },
  [GET_BOOKMARKS_TAG],
  { tags: [GET_BOOKMARKS_TAG] },
);
const getCachedBookmarks = async () => {
  const { userId } = await getUserId();
  if (!userId) {
    return;
  }
  const bookmarks = await cachedPart(userId);
  return bookmarks;
};

export default getCachedBookmarks;
