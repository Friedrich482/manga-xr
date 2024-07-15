import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import NavElements from "./NavElements";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import { notFound } from "next/navigation";
import convertChapterToSlug from "@/utils/convertChapterToSlug";

const EndSection = async ({
  altTitle,
  chapterTitleFromUrl,
}: {
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  const [mangaData, images] = await Promise.all([
    fetchUnitMangaInfo(altTitle),
    fetchChapterPages(convertChapterToSlug(chapterTitleFromUrl), altTitle),
  ]);
  if (mangaData && images) {
    const { chapters } = mangaData;
    return (
      <section className="mt-4 w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <NavElements
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
          images={images}
        />
      </section>
    );
  }
  return notFound();
};
export default EndSection;
