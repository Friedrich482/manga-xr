import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import ChaptersPagesDropDown from "./ChapterPagesDropDown";

const ChapterPagesDropDownWrapper = async ({
  chapterTitleFromUrl,
  mangaTitle,
}: {
  chapterTitleFromUrl: string;
  mangaTitle: string;
}) => {
  const images = await fetchChapterPages(
    chapterTitleFromUrl.replace(" ", "-"),
    mangaTitle,
  );
  if (images) {
    return <ChaptersPagesDropDown images={images} />;
  }
};
export default ChapterPagesDropDownWrapper;
