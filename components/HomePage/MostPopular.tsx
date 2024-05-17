import Image from "next/image";
import newMangaDex from "@/fetch-functions/fetchPopular";

const MostPopular = async () => {
  const mangaDex = new newMangaDex();
  const res = (await mangaDex.fetchPopular(1, 10)).results;

  const popularMangaPromises = res.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const popularMangaS = await Promise.all(popularMangaPromises);
  return (
    <section className="flex w-4/12 flex-col items-center justify-center gap-5 place-self-end">
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

        return (
          <div
            key={popularManga.id}
            className="flex items-center justify-center"
          >
            <Image
              className="w-20"
              priority={false}
              alt={popularManga.title as string}
              src={popularManga.image as string}
              width={300}
              height={300}
            />
            <div className="flex w-4/5 flex-col items-center justify-center">
              <div>
                {popularManga.title ? (
                  <p>{popularManga.title as string}</p>
                ) : englishTitle ? (
                  <p>{englishTitle}</p>
                ) : (
                  <p>lol</p>
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
