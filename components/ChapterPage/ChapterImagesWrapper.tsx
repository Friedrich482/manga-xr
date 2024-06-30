import { fetchChapterPages } from "@/utils/manga/fetchChapterPages";
import Image from "next/image";
import ChapterImages from "./ChapterImages";

const ChapterImagesWrapper = async ({
  altTitle,
  chapter,
}: {
  altTitle: string;
  chapter: string;
}) => {
  const images = await fetchChapterPages(chapter, altTitle);
  if (images) {
    return <ChapterImages images={images} />;
  }
};

export default ChapterImagesWrapper;
