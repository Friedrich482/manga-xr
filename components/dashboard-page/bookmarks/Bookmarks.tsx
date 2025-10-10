import DeleteDropDown from "../history/DeleteDropDown";
import MangaElement from "@/components/MainMangaElement";
import deleteBookmarkAction from "@/actions/bookmark/deleteBookmarkAction";
import getCachedBookmarks from "@/lib/getCachedBookmarks";

const Bookmarks = async () => {
  const bookmarks = await getCachedBookmarks();

  if (!bookmarks) {
    return;
  }

  return (
    <div>
      {bookmarks.length > 0 ? (
        <div className="grid w-full min-w-32 grid-cols-1 gap-x-6 gap-y-20 min-[450px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1200px]:grid-cols-4">
          {bookmarks.map(
            ({ chapterSlug, image, mangaName, chapterTitle, id }) => (
              <div className="group relative" key={chapterSlug}>
                <MangaElement
                  manga={{
                    lastChapter: chapterTitle,
                    image,
                    title: mangaName,
                    chapterSlug,
                  }}
                  link={`/chapters/${chapterSlug}`}
                />
                <DeleteDropDown
                  deleteDataServerAction={deleteBookmarkAction}
                  id={id}
                />
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="w-full text-center">
          No bookmarks yet. Once you{"'"}ll have created some, they will be
          displayed here
        </div>
      )}
    </div>
  );
};
export default Bookmarks;
