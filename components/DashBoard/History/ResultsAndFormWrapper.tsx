"use client";

import MangasInHistoryList from "./MangasInHistoryList";
import SearchMangaInHistoryForm from "./SearchMangaInHistoryForm";
import { findUserSManga } from "@/data-access/manga";
import { useState } from "react";

const ResultsAndFormWrapper = ({
  mangasInHistory,
}: {
  mangasInHistory: Awaited<ReturnType<typeof findUserSManga>>;
}) => {
  const [finalData, setFinalData] = useState("");
  return (
    <>
      <SearchMangaInHistoryForm
        finalData={finalData}
        setFinalData={setFinalData}
      />
      <MangasInHistoryList
        mangasInHistory={mangasInHistory}
        finalData={finalData}
      />
    </>
  );
};
export default ResultsAndFormWrapper;
