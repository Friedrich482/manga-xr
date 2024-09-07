import { Suspense } from "react";
import History from "./History";
import SectionTitle from "@/components/lib/SectionTitle";
import HistorySkeleton from "@/components/Skeleton/HistorySkeleton";

const HistoryTab = () => {
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
