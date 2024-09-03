import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import MangaElement from "../MainMangaElement";
import { getHistory } from "@/data-access/history";
import { findUserSManga } from "@/data-access/manga";

const History = async () => {
  const { userId } = await verifySession();
  const user = await getUser(userId);
  if (!user) {
    notFound();
  }

  const history = await getHistory(userId);
  //   condition always true because the user gets an history when he is created
  if (history) {
    const { id: historyId } = history;
    const mangasInHistory = await findUserSManga(historyId);
    return (
      <div className="flex w-full flex-wrap items-center justify-start gap-12">
        {mangasInHistory.length > 0 ? (
          mangasInHistory.map((mangaInHistory) => {
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
          })
        ) : (
          <p className="w-full text-center">
            Once you will read some mangas, they will be displayed here{" "}
          </p>
        )}
      </div>
    );
  }
  notFound();
};
export default History;
