import NavElements from "./NavElements";
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
  const [mangaDataPromise, imagesPromise] = await Promise.allSettled([
    fetchUnitMangaInfo(mangaSlug),
    fetchChapterPages(convertChapterToSlug(chapterTitleFromUrl), mangaSlug),
  ]);
  if (
    mangaDataPromise.status === "fulfilled" &&
    mangaDataPromise.value &&
    imagesPromise.status === "fulfilled" &&
    imagesPromise.value
  ) {
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
  return notFound();
};
export default EndSection;
