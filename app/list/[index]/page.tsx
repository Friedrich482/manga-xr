import { metadata } from "@/app/layout";
import MangaList from "@/components/ListPage/MangaList";
import { Suspense } from "react";

const page = ({ params }: { params: { index: string } }) => {
  const { index } = params;
  metadata.title = `List : ${index}`;
  return (
    <main className="mt-6 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <h2 className="mb-12 w-full text-center text-5xl">
        List : <span className="text-orange-700">{index.toUpperCase()}</span>
      </h2>
      <Suspense fallback={<div>Loading list...</div>}>
        <MangaList index={index} />
      </Suspense>
    </main>
  );
};

export default page;
