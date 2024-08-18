import { metadata } from "@/app/layout";
import MangaList from "@/components/ListPage/MangaList";
import ListPageSkeleton from "@/components/Skeleton/ListPageSkeleton";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Main from "@/components/lib/Main";
import SectionTitle from "@/components/lib/SectionTitle";
import { alphabet } from "@/lib/constants";
import PrincipalSection from "@/components/lib/PrincipalSection";

const ListPage = ({ params }: { params: { index: string } }) => {
  const { index } = params;
  if (index !== "numbers" && alphabet.indexOf(index.toUpperCase()) === -1) {
    notFound();
  }
  metadata.title = `List : ${index}`;
  return (
    <Main>
      <PrincipalSection>
        <SectionTitle className="w-5/6">
          List :{" "}
          <span className="text-primary">
            {index !== "numbers" ? index.toUpperCase() : index}
          </span>
        </SectionTitle>
        <Suspense fallback={<ListPageSkeleton />}>
          <MangaList index={index} />
        </Suspense>
      </PrincipalSection>
    </Main>
  );
};

export default ListPage;
