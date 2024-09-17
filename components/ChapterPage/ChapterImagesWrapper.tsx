import ChapterImages from "./ChapterImages";
import ProgressBar from "./ProgressBar";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";

const ChapterImagesWrapper = async ({
  mangaSlug,
  chapterSlug,
}: {
  mangaSlug: string;
  chapterSlug: string;
}) => {
  const images = await fetchChapterPages(chapterSlug, mangaSlug);
  if (images) {
    return (
      <>
        <ChapterImages images={images} />
        <ProgressBar images={images} />
      </>
    );
  }
};

export default ChapterImagesWrapper;
