import Image from "next/image";
import prisma from "@/lib/db";
const PopularMangaElement = async ({ id }: { id: number }) => {
  const popularManga = await prisma.popularManga.findFirst({
    skip: id,
    take: 1,
  });
  if (popularManga) {
    return (
      <>
        {/* large screens (more than 860px)*/}

        <div className="group hidden w-full flex-shrink-0 cursor-pointer items-center justify-center gap-2 large-nav:flex">
          <div className="h-24 w-3/12">
            <Image
              className="h-24 w-16 rounded-lg"
              priority={true}
              alt={popularManga.title}
              src={popularManga.image}
              width={64}
              height={96}
            />
          </div>
          <div className="flex h-24 w-9/12 flex-col items-start justify-center">
            <div className="flex h-1/2 w-full items-start justify-start text-[15px] font-bold transition duration-300 ease-in-out group-hover:text-orange-400">
              {popularManga.title}
            </div>

            <div className="h-1/4 text-sm font-light">
              {`${popularManga.lastChapter}`}
            </div>
            <div className="h-1/4 text-sm font-light">
              {/* {genres?.map((genre) =>
              genres.indexOf(genre) < 2 ? (
                <span key={genre}>{`${genre}, `}</span>
              ) : (
                <span key={genre}>{`${genre} `}</span>
              ),
            )} */}
              {popularManga.genres}
            </div>
          </div>
        </div>

        {/*smaller screens (less than 860px)*/}

        <div className="flex h-[90%] w-44 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-y-1 transition duration-300 ease-in-out hover:scale-110 large-nav:hidden">
          <div className="flex h-3/4 w-full items-center justify-center">
            <Image
              className="h-[280.95px] w-44 rounded-lg"
              priority={true}
              alt={popularManga.title}
              src={popularManga.image}
              width={176}
              height={300}
            />
          </div>

          <div className="flex h-1/4 w-full flex-col items-start justify-center">
            <div className="flex h-2/3 w-full items-center justify-start text-[15px] font-bold group-hover:text-orange-400 hover:transition hover:duration-300 hover:ease-in-out">
              {popularManga.title}
            </div>
            <div className="h-1/3 text-sm font-light">
              {`${popularManga.lastChapter}`}
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default PopularMangaElement;
