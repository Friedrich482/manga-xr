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
    <div className="flex w-full flex-wrap items-center justify-start gap-12">
      {bookmarks.length > 0 ? (
        bookmarks.map(({ chapterSlug, image, mangaName, chapterTitle, id }) => (
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
        ))
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
