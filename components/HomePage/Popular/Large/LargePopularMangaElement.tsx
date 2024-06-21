import Image from "next/image";
import prisma from "@/lib/db";
const LargePopularMangaElement = async ({ id }: { id: number }) => {
  const popularManga = await prisma.popularManga.findFirst({
    skip: id,
    take: 1,
  });
  if (popularManga) {
    const { genres, image, lastChapter, title } = popularManga;
    // get the genres from the "genres" string
    const arrayOfGenres: string[] = [];
    let substring = genres.substring(genres.indexOf(":") + 3, genres.length);
    let i = 0;
    let index = 0;
    while (i < 3) {
      index = substring.indexOf(",");
      let genre = substring.slice(0, index);
      substring = substring.substring(index + 2, substring.length);
      arrayOfGenres.push(genre);
      i++;
    }
    return (
      <>
        <div className="group hidden w-full flex-shrink-0 cursor-pointer items-center justify-center gap-2 large-nav:flex">
          <div className="h-24 w-3/12">
            <Image
              className="h-24 w-16 rounded-lg"
              priority={false}
              alt={title}
              src={image}
              width={64}
              height={96}
            />
          </div>
          <div className="flex h-24 w-9/12 flex-col items-start justify-center">
            <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-orange-400">
              {title.slice(0, 30) + `${title.length >= 30 ? "..." : ""}`}
            </div>

            <div className="h-1/4 text-sm font-light">{`${lastChapter}`}</div>
            <div className="h-1/4 text-sm font-light">
              {arrayOfGenres.map((genre) => (
                <span key={genre}>
                  {arrayOfGenres.indexOf(genre) === arrayOfGenres.length - 1
                    ? genre
                    : `${genre}, `}
                </span>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default LargePopularMangaElement;
