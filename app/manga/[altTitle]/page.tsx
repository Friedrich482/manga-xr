import { metadata } from "@/app/layout";
import { fetchUnitMangaInfo } from "@/utils/manga/fetchUnitMangaInfo";

const page = async ({ params }: { params: { altTitle: string } }) => {
  const { altTitle } = params;
  metadata.title = `Manga : ${altTitle}`;
  //   const mangaData = await fetchUnitMangaInfo(altTitle);
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      {altTitle}
    </main>
  );
};
export default page;
