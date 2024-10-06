import Bookmarks from "./Bookmarks";
import SectionTitle from "@/components/lib/SectionTitle";
import { metadata } from "@/app/layout";

const BookmarkTab = () => {
  metadata.title = "Bookmarks | MangaXR";
  return (
    <>
      <SectionTitle>Bookmarks</SectionTitle>
      <Bookmarks />
    </>
  );
};
export default BookmarkTab;
