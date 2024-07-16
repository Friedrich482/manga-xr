import { fetchUnitMangaInfo } from "@/utils/fetch/fetchUnitMangaInfo";
import Image from "next/image";
import Link from "next/link";
import Chapters from "./Chapters";
import Synopsys from "./Synopsys";
import { notFound } from "next/navigation";
import StartReadingButton from "./StartReadingButton";
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
      <section className="mt-20 flex w-full flex-col items-center justify-start self-start large-nav:w-3/4">
        <h2 className="w-11/12 place-self-start text-start text-3xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
          {title}
        </h2>
        <div className="mt-4 w-11/12 justify-start place-self-start">
          <Image
            className="float-left mb-1 mr-6 h-72 w-52 min-w-32 rounded-lg"
            src={image}
            alt={title}
            priority={true}
            width={208}
            height={288}
          />
          <Synopsys synopsys={synopsys} />
        </div>

        <div className="mb-5 mt-10 flex w-11/12 flex-col gap-10 place-self-start">
          {infos.map((element) => (
            <div
              key={element.title}
              className="rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500"
            >
              <span className="text-orange-400">{element.title}</span>:{" "}
              {element.content}
            </div>
          ))}
          <div className="flex flex-col items-start justify-center gap-5 text-lg">
            <p className="text-orange-400">
              Genres<span className="text-white">:</span>
            </p>
            <div className="flex flex-wrap items-center justify-start gap-4">
              {arrayOfGenres.map((genre) => (
                <Link
                  href={`/search?name=${genre.toLowerCase()}`}
                  className="rounded-xl border border-b-2 border-r-2 border-zinc-600 border-b-violet-500 border-r-violet-500 px-3 py-1 text-neutral-800/85 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                  key={genre}
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 w-full">
          <StartReadingButton altTitle={altTitle} />
        </div>
        <Chapters chapters={chapters} altTitle={altTitle} />
      </section>
    );
  } else {
    notFound();
  }
};
export default MangaSection;
