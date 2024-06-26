import { metadata } from "@/app/layout";
import MangaList from "@/components/ListPage/mangaList";
import { Suspense } from "react";

const page = ({ params }: { params: { index: string } }) => {
  const { index } = params;
  metadata.title = `List : ${index}`;
  return (
    <Suspense fallback={<div>Loading list...</div>}>
      <MangaList index={index} />
    </Suspense>
  );
};

export default page;
