import Image from "next/image";
import newMangaDex from "@/fetch-functions/fetchPopular";

import { IMangaResult } from "@consumet/extensions";

const MostPopular = async () => {
  const mangaDex = new newMangaDex();
  const res = (await mangaDex.fetchPopular(1, 10)).results;

  const popularMangaPromises = res.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const popularMangaS = await Promise.all(popularMangaPromises);
  console.log(popularMangaS[6]);
  return (
    <section className="flex w-4/12 flex-col items-center justify-center gap-5 place-self-end">
      {popularMangaS.map((popularManga) => (
        <div key={popularManga.id} className="flex items-center justify-center">
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
              {popularManga.title
                ? (popularManga.title as string)
                : popularManga.altTitles
                  ? typeof popularManga.altTitles === "string"
                    ? popularManga.altTitles
                    : popularManga.altTitles
                  : ""}
            </div>
            {/* <div>{popularManga. as string}</div> */}
          </div>
        </div>
      ))}
    </section>
  );
};
export default MostPopular;
