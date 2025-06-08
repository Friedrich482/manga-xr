import PrincipalSection from "../lib/PrincipalSection";
import { ResultList } from "./ResultList";
import SearchResultsSkeleton from "../skeleton/SearchResultsSkeleton";
import SectionTitle from "../lib/SectionTitle";
import { Suspense } from "react";

const Results = ({ mangaName }: { mangaName: string }) => {
  return (
    <PrincipalSection className="w-3/4 justify-start max-large-nav:w-full">
      <SectionTitle className="w-5/6">
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
