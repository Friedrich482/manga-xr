import { metadata } from "@/app/layout";
import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import MangaSection from "@/components/MangaPage/MangaSection";

const page = ({ params }: { params: { altTitle: string } }) => {
  const { altTitle } = params;
  metadata.title = `Manga : ${altTitle}`;
  return (
    <main className="flex min-h-lvh w-11/12 flex-col-reverse justify-center gap-x-5 large-nav:flex-row large-nav:justify-end">
      <MangaSection altTitle={altTitle} />
      <LargeMostPopular />
      <SmallMostPopular />
    </main>
  );
};
export default page;
