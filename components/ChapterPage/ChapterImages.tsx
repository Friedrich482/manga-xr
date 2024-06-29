import { fetchChapterPages } from "@/utils/manga/fetchChapterPages";
import Image from "next/image";

const ChapterImages = async ({
  altTitle,
  chapter,
}: {
  altTitle: string;
  chapter: string;
}) => {
  const images = await fetchChapterPages(chapter, altTitle);
  if (images) {
    return (
      <section className="flex w-5/6 flex-col items-center justify-start self-center">
        <div className="flex w-full flex-col">
          {images.map((image) => (
            <Image
              alt={`${images.indexOf(image)}`}
              src={image}
              key={`${images.indexOf(image)}`}
              width={500}
              height={600}
              className="h-auto w-full"
              loading="lazy"
            />
          ))}
        </div>
      </section>
    );
  }
};

export default ChapterImages;
