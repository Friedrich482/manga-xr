import Image from "next/image";
import Link from "next/link";
import newMangaDex from "@/fetch-functions/fetchPopular";
import { IMangaChapter } from "@consumet/extensions";
import { BsFire } from "react-icons/bs";
const MostPopular = async () => {
  const mangaDex = new newMangaDex();
  const res = (await mangaDex.fetchPopular(1, 10)).results;
  const popularMangaPromises = res.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const popularMangaS = await Promise.all(popularMangaPromises);
  return (
    <section className="my-14 mr-10 flex w-1/4 min-w-60 max-w-80 flex-col items-center justify-center gap-8 place-self-end text-neutral-700 dark:text-neutral-300">
      <h2 className="w-full text-xl">
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <BsFire />
          <span>Popular</span>
        </Link>
      </h2>
      {popularMangaS.map((popularManga) => {
        let englishTitle: string | null = null;

        if (popularManga.altTitles) {
          if (typeof popularManga.altTitles === "string") {
            englishTitle = popularManga.altTitles;
          } else {
            for (const mangaTitle of popularManga.altTitles) {
              if (typeof mangaTitle === "string") {
                englishTitle = mangaTitle;
                break;
              }
              if (mangaTitle.hasOwnProperty("en")) {
                englishTitle = mangaTitle["en"];
                break;
              }
            }
          }
        }
        // This variable allows slice when the title (or englishTitle) is too long
        const lastCharacter = popularManga.title
          ? (popularManga.title as string).indexOf(" - ") !== -1
            ? (popularManga.title as string).indexOf(" - ")
            : (popularManga.title as string).length - 1
          : (englishTitle as string).indexOf(" - ") !== -1
            ? (englishTitle as string).indexOf(" - ")
            : (englishTitle as string).length - 1;
        // console.log(popularManga);

        //  get the last chapter
        const lastChapter = popularManga.chapters
          ? popularManga.chapters?.length >= 1
            ? popularManga.chapters[0].chapterNumber
            : ""
          : "";
        // one punch man is an edge case, the object fetched don't contains opm chapters, so it will be managed differently
        if (popularManga.chapters === undefined) {
        }
        // get the genres
        const genres = popularManga.genres?.slice(0, 3);
        return (
          <div
            key={popularManga.id}
            className="group flex w-full cursor-pointer items-center justify-center gap-2"
          >
            <div className="h-24 w-3/12">
              <Image
                className="h-24 w-16 rounded-lg"
                priority={true}
                alt={(popularManga.title as string) || (englishTitle as string)}
                src={popularManga.image as string}
                width={300}
                height={400}
              />
            </div>
            <div className="flex h-24 w-9/12 flex-col items-start justify-center">
              {popularManga.title ? (
                <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-orange-400">
                  {`${(popularManga.title as string).slice(0, lastCharacter + 1)}`}
                </div>
              ) : englishTitle ? (
                <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-orange-400">
                  {`${(englishTitle as string).slice(0, lastCharacter + 1)}`}
                </div>
              ) : (
                <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold group-hover:text-orange-400">
                  {""}
                </div>
              )}
              <div className="h-1/4 text-sm font-light">
                Chapter {`${lastChapter}`}
              </div>
              <div className="h-1/4 text-sm font-light">
                {genres?.map((genre) =>
                  genres.indexOf(genre) < 2 ? (
                    <span key={genre}>{`${genre}, `}</span>
                  ) : (
                    <span key={genre}>{`${genre}, ...`}</span>
                  ),
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default MostPopular;
