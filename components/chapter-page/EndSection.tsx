import { FETCH_CHAPTER_PAGES_TAG } from "@/lib/cache-keys/unstable_cache";
import NavElements from "./NavElements";
import ReloadDataButton from "../lib/ReloadDataButton";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";

const EndSection = async ({ chapterSlug }: { chapterSlug: string }) => {
  const imagesData = await fetchChapterPages(chapterSlug);

  if (!imagesData) {
    return (
      <ReloadDataButton tag={`${FETCH_CHAPTER_PAGES_TAG}:${chapterSlug}`} />
    );
  }
  const { images, mangaSlug, currentChapterTitle } = imagesData;

  const mangaData = await fetchUnitMangaInfo(mangaSlug);

  if (!mangaData || mangaData === 404) {
    return (
      <ReloadDataButton tag={`${FETCH_CHAPTER_PAGES_TAG}:${chapterSlug}`} />
    );
  }
  const { chapters } = mangaData;

  return (
    <section className="w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
      <NavElements
        mangaSlug={mangaSlug}
        chapters={chapters}
        currentChapterTitle={currentChapterTitle}
        images={images}
      />
    </section>
  );
};
export default EndSection;
