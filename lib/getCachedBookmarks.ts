import { GET_BOOKMARKS } from "./constants";
import { getAllBookmarks } from "@/data-access/bookmarks";
import getUserId from "./getUserId";
import { unstable_cache } from "next/cache";

const cachedPart = unstable_cache(
  async (userId: string) => {
    const bookmarks = await getAllBookmarks(userId);
    return bookmarks;
  },
  [GET_BOOKMARKS],
  { tags: [GET_BOOKMARKS] },
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
