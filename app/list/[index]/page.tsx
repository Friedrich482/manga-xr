import ListPageSkeleton from "@/components/skeleton/ListPageSkeleton";
import Main from "@/components/lib/Main";
import MangaList from "@/components/list-page/MangaList";
import PrincipalSection from "@/components/lib/PrincipalSection";
import SectionTitle from "@/components/lib/SectionTitle";
import { Suspense } from "react";
import { alphabet } from "@/lib/constants";
import { metadata } from "@/app/layout";
import { notFound } from "next/navigation";

const ListPage = async (props: { params: Promise<{ index: string }> }) => {
  const params = await props.params;
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
