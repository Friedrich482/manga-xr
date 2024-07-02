import { fetchChapterPages } from "@/utils/manga/fetchChapterPages";
import ChapterImages from "./ChapterImages";
import ProgressBar from "./ProgressBar/ProgressBar";

const ChapterImagesWrapper = async ({
  altTitle,
  chapter,
}: {
  altTitle: string;
  chapter: string;
}) => {
  const images = await fetchChapterPages(chapter, altTitle);
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
