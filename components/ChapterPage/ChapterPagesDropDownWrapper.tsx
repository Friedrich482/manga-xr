import { fetchChapterPages } from "@/utils/fetch/fetchChapterPages";
import ChaptersPagesDropDown from "./ChapterPagesDropDown";

const ChapterPagesDropDownWrapper = async ({
  chapterTitleFromUrl,
  altTitle,
}: {
  chapterTitleFromUrl: string;
  altTitle: string;
}) => {
  const images = await fetchChapterPages(
    chapterTitleFromUrl.replace(" ", "-"),
    altTitle,
  );
  if (images) {
    return <ChaptersPagesDropDown images={images} />;
  }
};
export default ChapterPagesDropDownWrapper;
