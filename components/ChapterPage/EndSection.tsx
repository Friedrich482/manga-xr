import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import NavElements from "./NavElements";

const EndSection = async ({
  altTitle,
  chapterTitleFromUrl,
}: {
  altTitle: string;
  chapterTitleFromUrl: string;
}) => {
  const mangaData = await fetchUnitMangaInfo(altTitle);
  if (mangaData) {
    const { chapters } = mangaData;
    return (
      <section className="mt-4 w-5/6 flex-wrap gap-4 self-center text-xl text-neutral-700 dark:text-neutral-300">
        <NavElements
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
          chapters={chapters}
        />
      </section>
    );
  }
};
export default EndSection;
