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
    <div>
      {mangasInHistory.length > 0 ? (
        filteredArray.length > 0 ? (
          <div className="grid w-full min-w-32 grid-cols-1 gap-x-6 gap-y-20 min-[450px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1200px]:grid-cols-4">
            {filteredArray.map(
              ({ image, lastChapterReadSlug, name, lastChapterTitle, id }) => (
                <div className="group relative" key={name}>
                  <MangaElement
                    manga={{
                      chapterSlug: lastChapterReadSlug,
                      title: name,
                      image,
                      lastChapter: lastChapterTitle,
                    }}
                    link={`/chapters/${lastChapterReadSlug}`}
                  />
                  <DeleteDropDown
                    id={id}
                    deleteDataServerAction={deleteMangaFromHistoryAction}
                  />
                </div>
              ),
            )}
          </div>
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
