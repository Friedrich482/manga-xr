"use client";
import addMangaToHistoryAction from "@/actions/history-actions/addMangaToHistoryAction";
import { useEffect } from "react";

const AddMangaToHistoryClientComponent = ({
  image,
  mangaSlug,
  chapterSlug,
}: {
  image: string;
  mangaSlug: string;
  chapterSlug: string;
}) => {
  useEffect(() => {
    (async () => {
      await addMangaToHistoryAction({
        slug: mangaSlug,
        lastChapterReadSlug: chapterSlug,
        image,
      });
    })();
  }, []);
  return <></>;
};

export default AddMangaToHistoryClientComponent;
