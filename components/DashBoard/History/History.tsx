import getUser from "@/lib/getUser";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";
import { getHistory } from "@/data-access/history";
import { findUserSManga } from "@/data-access/manga";
import ResultsAndFormWrapper from "./ResultsAndFormWrapper";

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
    return <ResultsAndFormWrapper mangasInHistory={mangasInHistory} />;
  }
  notFound();
};
export default History;
