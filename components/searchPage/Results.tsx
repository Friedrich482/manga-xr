import { Suspense } from "react";
import PrincipalSection from "../lib/PrincipalSection";
import SectionTitle from "../lib/SectionTitle";
import { ResultList } from "./ResultList";
import SearchResultsSkeleton from "../Skeleton/SearchResultsSkeleton";

const Results = ({ mangaName }: { mangaName: string }) => {
  return (
    <PrincipalSection className="w-3/4 justify-start max-large-nav:w-full">
      <SectionTitle>
        Results of research :{" "}
        <span className="text-primary">
          {mangaName !== "" ? mangaName : "' '"}
        </span>
      </SectionTitle>
      <Suspense fallback={<SearchResultsSkeleton />} key={mangaName}>
        <ResultList mangaName={mangaName} />
      </Suspense>
    </PrincipalSection>
  );
};
export default Results;
