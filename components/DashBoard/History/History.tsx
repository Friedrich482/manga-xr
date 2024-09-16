import ResultsAndFormWrapper from "./ResultsAndFormWrapper";
import filterUniqueNames from "@/utils/filterUniqueNames";
import { getHistory } from "@/data-access/history";
import getMangaFromHistory from "@/lib/getMangasFromHistory";
import getUser from "@/lib/getUser";
import { notFound } from "next/navigation";
import { verifySession } from "@/lib/session";

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
    // filtering here because we can have two mangas with the same name and different slug (seasons, for example "Manga"
    // and "Manga_1" as slugs in the same history)
    const mangasInHistory = filterUniqueNames(
      await getMangaFromHistory(historyId),
    );
    return <ResultsAndFormWrapper mangasInHistory={mangasInHistory} />;
  }
  notFound();
};
export default History;
