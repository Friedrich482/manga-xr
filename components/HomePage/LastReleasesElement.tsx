import mainFetch from "@/actions/mainFetch";
import prisma from "@/lib/db";
import Image from "next/image";

const LastReleasesElement = async ({ id }: { id: number }) => {
  await mainFetch();
  const lastReleasedManga = await prisma.latestUpdates.findFirst({
    skip: id,
    take: 1,
  });
  if (lastReleasedManga) {
    return (
      <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110 hover:duration-300 dark:bg-default-black">
        <div className="w-full">
          <Image
            className="h-72 min-h-32 w-52 min-w-32 rounded-lg"
            alt={lastReleasedManga.title}
            src={lastReleasedManga.image}
            width={208}
            height={288}
            priority={true}
          ></Image>
        </div>
        <div className="h-20 w-full">
          <div className="w-full text-wrap text-start text-base font-bold group-hover:text-orange-400">
            {lastReleasedManga.title}
          </div>
          <div className="text-start font-extralight">
            {`${lastReleasedManga.lastChapter}`}
          </div>
        </div>
      </div>
    );
  }
};
export default LastReleasesElement;
