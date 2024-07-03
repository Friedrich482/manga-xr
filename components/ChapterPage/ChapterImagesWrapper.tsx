import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import ChapterImages from "./ChapterImages";
import ProgressBar from "./ProgressBar/ProgressBar";

const ChapterImagesWrapper = async ({
  altTitle,
  chapterSlug,
}: {
  altTitle: string;
  chapterSlug: string;
}) => {
  const images = await fetchChapterPages(chapterSlug, altTitle);
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
