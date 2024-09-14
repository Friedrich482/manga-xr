import { GET_BOOKMARK_SWR_KEY } from "@/lib/constants";
import { getBookmark } from "@/data-access/bookmarks";
import useSWR from "swr";

const fetcher = async (
  url: string,
): Promise<{ bookmark: Awaited<ReturnType<typeof getBookmark>> }> => {
  const res = await fetch(url);
  return res.json();
};
const useBookmark = (chapterSlug: string, mangaSlug: string) => {
  const { data, error, isLoading } = useSWR(
    `${GET_BOOKMARK_SWR_KEY}?chapterSlug=${chapterSlug}&mangaSlug=${mangaSlug}`,
    fetcher,
  );

  return {
    bookmark: data?.bookmark,
    isLoading,
    error,
  };
};
export default useBookmark;
