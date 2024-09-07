import MangaElement from "@/components/MainMangaElement";
import { findUserSManga } from "@/data-access/manga";
import DeleteDropDown from "./DeleteDropDown";

const MangasInHistoryList = ({
  mangasInHistory,
  finalData,
}: {
  mangasInHistory: Awaited<ReturnType<typeof findUserSManga>>;
  finalData: string;
}) => {
  const filteredArray = mangasInHistory.filter((manga) =>
    manga.name.toLowerCase().includes(finalData.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-12">
      {mangasInHistory.length > 0 ? (
        filteredArray.length > 0 ? (
          filteredArray.map((mangaInHistory) => {
            const { id, image, lastChapterRead, name, slug } = mangaInHistory;
            return (
              <div className="group relative" key={name}>
                <MangaElement
                  manga={{
                    altTitle: slug,
                    title: name,
                    image,
                    lastChapter: lastChapterRead,
                  }}
                />
                <DeleteDropDown mangaId={id} />
              </div>
            );
          })
        ) : (
          <p className="w-full text-center">
            No result found for{" "}
            <span className="text-primary">{finalData}</span>
          </p>
        )
      ) : (
        <p className="w-full text-center">
          Once you will read some mangas, they will be displayed here{" "}
        </p>
      )}
    </div>
  );
};
export default MangasInHistoryList;
