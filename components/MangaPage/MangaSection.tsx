import { fetchUnitMangaInfo } from "@/utils/manga/fetchUnitMangaInfo";
import Image from "next/image";
import Link from "next/link";

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
      { title: "Updated at", content: latestUpdateDate },
    ];
    // get the genres
    const arrayOfGenres: string[] = [];
    let i = 0;
    let index = 0;
    let substring = genres;
    while (i < 9) {
      index = substring.indexOf(",");
      if (index === -1) {
        arrayOfGenres.push(substring);
        break;
      }
      let genre = substring.slice(0, index);
      substring = substring.substring(index + 2, substring.length);
      arrayOfGenres.push(genre);
      i++;
    }
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
              <p className="first-letter:text-7xl first-letter:text-orange-500">
                {synopsys}
              </p>
            </div>
            {infos.map((element) => (
              <div
                key={element.title}
                className="rounded-sm border-l-2 border-l-neutral-500 pl-2 text-lg"
              >
                <span className="text-orange-400">{element.title}</span>:{" "}
                {element.content}
              </div>
            ))}
            <div className="flex flex-col items-start justify-center gap-5 text-lg">
              <p className="text-orange-400 ">
                Genres<span className="text-white">:</span>
              </p>
              <div className="flex flex-wrap items-center justify-start gap-4">
                {arrayOfGenres.map((genre) => (
                  <Link
                    href={`/search?name=${genre.toLowerCase()}`}
                    className="rounded-xl border border-b-2 border-r-2 border-zinc-600 border-b-violet-500 border-r-violet-500 px-3 py-1 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                    key={genre}
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default MangaSection;
