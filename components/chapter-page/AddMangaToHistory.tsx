"use client";
import addMangaToHistoryAction from "@/actions/history-actions/addMangaToHistoryAction";
import { useEffect } from "react";

const AddMangaToHistoryClientComponent = ({
  title,
  image,
  mangaSlug,
  chapterTitleFromUrl,
}: {
  title: string;
  image: string;
  mangaSlug: string;
  chapterTitleFromUrl: string;
}) => {
  useEffect(() => {
    (async () => {
      await addMangaToHistoryAction({
        name: title,
        slug: mangaSlug,
        lastChapter: chapterTitleFromUrl,
        image,
      });
    })();
  }, []);
  return <></>;
};

export default AddMangaToHistoryClientComponent;
