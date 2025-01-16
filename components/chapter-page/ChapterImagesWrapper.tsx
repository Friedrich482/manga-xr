import ChapterImages from "./ChapterImages";
import ProgressBar from "./ProgressBar";
import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";

const ChapterImagesWrapper = async ({
  chapterSlug,
}: {
  chapterSlug: string;
}) => {
  const data = await fetchChapterPages(chapterSlug);
  if (data) {
    const { images } = data;
    return (
      <>
        <ChapterImages images={images} />
        <ProgressBar images={images} />
      </>
    );
  }
};

export default ChapterImagesWrapper;
