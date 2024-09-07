import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import { getHistory } from "@/data-access/history";
import ResultsAndFormWrapper from "./ResultsAndFormWrapper";
import getMangaFromHistory from "@/lib/getMangasFromHistory";

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
    const mangasInHistory = await getMangaFromHistory(historyId);
    return <ResultsAndFormWrapper mangasInHistory={mangasInHistory} />;
  }
  notFound();
};
export default History;
