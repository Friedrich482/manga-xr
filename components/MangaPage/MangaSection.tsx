import { fetchUnitMangaInfo } from "@/utils/manga/fetchUnitMangaInfo";
import Image from "next/image";

const MangaSection = async ({ altTitle }: { altTitle: string }) => {
  const mangaData = await fetchUnitMangaInfo(altTitle);
  if (mangaData) {
    const {
      author,
      chapters,
      genres,
      image,
      latestUpdateDate,
      releaseDate,
      synopsys,
      title,
    } = mangaData;
    const infos = [
      { title: "Author", content: author },
      { title: "Year of release", content: releaseDate },
      { title: "Genres", content: genres + "..." },
      { title: "Updated at", content: latestUpdateDate },
    ];
    return (
      <section className="mt-20 flex w-3/4 flex-col items-center justify-start self-start">
        <h2 className="place-self-start pl-4 text-start indent-[13.5rem] text-3xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
          {title}
        </h2>
        <div className="mt-9 flex w-full items-center justify-start gap-x-8">
          <div className="flex-shrink-0 self-start">
            <Image
              className="h-72 w-52 min-w-32 rounded-lg"
              src={image}
              alt={title}
              priority={true}
              width={208}
              height={288}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-10">
            <div className="text-lg">
              <p className="first-letter:text-5xl first-letter:text-orange-500">
                {synopsys}
              </p>
            </div>
            {infos.map((element) => (
              <div key={element.title} className="text-lg">
                <span className="text-orange-400">{element.title}</span>:{" "}
                {element.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};
export default MangaSection;
