import {
  FETCH_CHAPTER_PAGES_TAG,
  FETCH_UNIT_MANGA_INFO_TAG,
} from "@/lib/cache-keys/unstable_cache";
import NavElements from "./NavElements";
import ReloadDataButton from "../lib/ReloadDataButton";
import convertChapterToSlug from "@/utils/convertChapterToSlug";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import { notFound } from "next/navigation";

const EndSection = async ({
  mangaSlug,
  chapterTitleFromUrl,
}: {
  mangaSlug: string;
  chapterTitleFromUrl: string;
}) => {
  const chapterSlug = convertChapterToSlug(chapterTitleFromUrl);
  const [mangaDataPromise, imagesPromise] = await Promise.allSettled([
    fetchUnitMangaInfo(mangaSlug),
    fetchChapterPages(chapterSlug, mangaSlug),
  ]);
  if (
    mangaDataPromise.status === "fulfilled" &&
    mangaDataPromise.value &&
    imagesPromise.status === "fulfilled" &&
    imagesPromise.value
  ) {
    if (typeof mangaDataPromise.value === "number") {
      // 404 manga not found
      notFound();
    }
    const { chapters } = mangaDataPromise.value;
    return (
      <section className="w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <NavElements
          mangaSlug={mangaSlug}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
          images={imagesPromise.value}
        />
      </section>
    );
  }
  return (
    <ReloadDataButton
      tags={[
        `${FETCH_UNIT_MANGA_INFO_TAG}:${mangaSlug}`,
        `${FETCH_CHAPTER_PAGES_TAG}: ${mangaSlug}-${chapterSlug}`,
      ]}
    />
  );
};
export default EndSection;
