import History from "./History";
import HistorySkeleton from "@/components/Skeleton/HistorySkeleton";
import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";

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
