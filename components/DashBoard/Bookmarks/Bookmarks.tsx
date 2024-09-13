import MangaElement from "@/components/MainMangaElement";
import getCachedBookmarks from "@/lib/getCachedBookmarks";

const Bookmarks = async () => {
  const bookmarks = await getCachedBookmarks();
  if (!bookmarks) {
    return;
  }
  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-12">
      {bookmarks.length > 0 ? (
        bookmarks.map(({ chapterSlug, image, mangaName, mangaSlug }) => (
          <MangaElement
            key={mangaName}
            manga={{
              altTitle: mangaName,
              lastChapter: chapterSlug.replaceAll("-", " "),
              image,
              title: mangaName,
            }}
            link={`/manga/${mangaSlug}/${chapterSlug}`}
          />
        ))
      ) : (
        <div>No bookmarks yet</div>
      )}
    </div>
  );
};
export default Bookmarks;
