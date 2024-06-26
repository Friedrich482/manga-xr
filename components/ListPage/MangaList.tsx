import { fetchListFromLetter } from "@/utils/manga/fetchListFromLetter";
import MangaElement from "../MainElement";

const MangaList = async ({ index }: { index: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const listOfManga = await fetchListFromLetter(index.toUpperCase());*
  if (listOfManga) {
    return (
      <section className="flex w-10/12 flex-wrap items-center justify-start gap-12">
        {listOfManga.map((manga) => (
          <MangaElement key={manga.title} manga={manga} />
        ))}
      </section>
    );
  }
};
export default MangaList;
