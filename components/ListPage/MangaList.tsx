import { fetchListFromLetter } from "@/utils/fetch/fetchListFromLetter";
import MangaElement from "../MainMangaElement";

const MangaList = async ({ index }: { index: string }) => {
  const listOfManga = await fetchListFromLetter(index.toUpperCase());
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
