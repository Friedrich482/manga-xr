import useBookmark from "./auth/useBookmark";
import { useSWRConfig } from "swr";
import useToastTheme from "./useToastTheme";

const useMutateBookmark = (chapterSlug: string, mangaSlug: string) => {
  const { bookmark } = useBookmark(chapterSlug, mangaSlug);
  const { mutate } = useSWRConfig();
  const toastOptions = useToastTheme();
  return { bookmark, mutate, toastOptions };
};
export default useMutateBookmark;
