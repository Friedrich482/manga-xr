import useBookmark from "./Auth/useBookmark";
import { useSWRConfig } from "swr";
import useToastTheme from "./useToastTheme";

const useMutateBookmark = (chapterSlug: string, altTitle: string) => {
  const { bookmark } = useBookmark(chapterSlug, altTitle);
  const { mutate } = useSWRConfig();
  const toastOptions = useToastTheme();
  return { bookmark, mutate, toastOptions };
};
export default useMutateBookmark;
