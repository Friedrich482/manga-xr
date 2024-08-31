import prisma from "@/lib/db";
import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import MangaElement from "../MainMangaElement";
import { MainElementMangaType } from "@/zod-schema/schema";

const History = async () => {
  const { userId } = await verifySession();
  const user = await getUser(userId);
  if (!user) {
    notFound();
  }

  const history = await prisma.history.findUnique({
    where: { userId },
  });
  //   condition always true because the user gets an history when he is created
  if (history) {
    const { id: historyId } = history;
    const mangasInHistory = await prisma.manga.findMany({
      where: { historyId },
      select: { image: true, lastChapterRead: true, name: true, slug: true },
    });
    return (
      <div className="flex w-full flex-wrap items-center justify-start gap-12">
        {mangasInHistory.toReversed().map((mangaInHistory) => {
          const { image, lastChapterRead, name, slug } = mangaInHistory;
          return (
            <MangaElement
              manga={{
                altTitle: slug,
                title: name,
                image,
                lastChapter: lastChapterRead,
              }}
              key={name}
            />
          );
        })}
      </div>
    );
  }
  notFound();
};
export default History;
