"use client";
import addMangaToHistoryAction from "@/actions/history-actions/addMangaToHistoryAction";
import { useEffect } from "react";

const AddMangaToHistoryClientComponent = ({
  title,
  image,
  mangaSlug,
  chapterSlug,
  currentChapterTitle: lastChapterTitle,
}: {
  title: string;
  image: string;
  mangaSlug: string;
  chapterSlug: string;
  currentChapterTitle: string;
}) => {
  useEffect(() => {
    (async () => {
      await addMangaToHistoryAction({
        name: title,
        slug: mangaSlug,
        lastChapterReadSlug: chapterSlug,
        image,
        lastChapterTitle,
      });
    })();
  }, []);
  return <></>;
};

export default AddMangaToHistoryClientComponent;
