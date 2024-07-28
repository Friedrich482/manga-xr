import { metadata } from "@/app/layout";
import MangaList from "@/components/ListPage/MangaList";
import ListPageSkeleton from "@/components/Skeleton/ListPageSkeleton";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import alphabet from "@/utils/alphabet";

const ListPage = ({ params }: { params: { index: string } }) => {
  const { index } = params;
  if (index !== "numbers" && alphabet.indexOf(index.toUpperCase()) === -1) {
    notFound();
  }
  metadata.title = `List : ${index}`;
  return (
    <section className="mt-6 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <h2 className="mb-12 w-full text-center text-5xl">
        List :{" "}
        <span className="text-orange-700">
          {index !== "numbers" ? index.toUpperCase() : index}
        </span>
      </h2>
      <Suspense fallback={<ListPageSkeleton />}>
        <MangaList index={index} />
      </Suspense>
    </section>
  );
};

export default ListPage;
