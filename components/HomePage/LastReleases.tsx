import { IMangaChapter } from "@consumet/extensions";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import Image from "next/image";
export type Chapter = {
  id: string;
  title: string;
  chapterNumber: string;
  volumeNumber: string | null;
  pages: number;
};
const LastReleases = async () => {
  const mangadex = new MangaDex();
  const data = await mangadex.search("black clover");

  const manga = await mangadex.fetchMangaInfo(
    "e7eabe96-aa17-476f-b431-2497d5e9d060",
  ); // black clover id

  const img = manga.image;

  const chapters = (manga.chapters as Chapter[]).filter(
    (chapter) => chapter.pages > 0,
  );
  const thirty = chapters.slice(0, 30);

  return (
    <>
      <Image src={img as string} alt="image" width={200} height={400} />
      <div className="flex flex-col items-center justify-center">
        {thirty?.map((chapter) => (
          <div
            className="flex flex-col items-center justify-center"
            key={chapter.id}
          >
            <div className="">{chapter.title}</div>
            <div>{chapter.chapterNumber}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default LastReleases;
