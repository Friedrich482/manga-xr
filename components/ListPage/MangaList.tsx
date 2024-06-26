import { fetchListFromLetter } from "@/utils/manga/fetchListFromLetter";

const MangaList = async ({ index }: { index: string }) => {
  const data = await fetchListFromLetter(index.toUpperCase());
  if (data) {
    return (
      <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
        <ul>
          {data.map((manga) => (
            <li key={manga.title}>{manga.title}</li>
          ))}
        </ul>
      </main>
    );
  }
};
export default MangaList;
