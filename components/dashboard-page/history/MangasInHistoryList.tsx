import DeleteDropDown from "./DeleteDropDown";
import MangaElement from "@/components/MainMangaElement";
import deleteMangaFromHistoryAction from "@/actions/history-actions/deleteMangaFromHistoryAction";
import { findUserSManga } from "@/data-access/manga";

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
          filteredArray.map(({ id, image, lastChapterRead, name, slug }) => (
            <div className="group relative" key={name}>
              <MangaElement
                manga={{
                  mangaSlug: slug,
                  title: name,
                  image,
                  lastChapter: lastChapterRead,
                }}
                link={`/manga/${slug}/${lastChapterRead.replaceAll(" ", "-")}`}
              />
              <DeleteDropDown
                deleteDataServerAction={deleteMangaFromHistoryAction}
                id={id}
              />
            </div>
          ))
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
