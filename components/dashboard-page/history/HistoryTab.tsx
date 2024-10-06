import History from "./History";
import HistorySkeleton from "@/components/skeleton/HistorySkeleton";
import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";
import { metadata } from "@/app/layout";

const HistoryTab = () => {
  metadata.title = "History | MangaXR";
  return (
    <>
      <SectionTitle className="w-full">History</SectionTitle>
      <Suspense fallback={<HistorySkeleton />}>
        <History />
      </Suspense>
    </>
  );
};
export default HistoryTab;
