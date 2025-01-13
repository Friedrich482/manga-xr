"use client";
import addMangaToHistoryAction from "@/actions/history-actions/addMangaToHistoryAction";
import { useEffect } from "react";

const AddMangaToHistoryClientComponent = ({
  title,
  image,
  mangaSlug,
  currentChapterTitle,
}: {
  title: string;
  image: string;
  mangaSlug: string;
  currentChapterTitle: string;
}) => {
  useEffect(() => {
    (async () => {
      await addMangaToHistoryAction({
        name: title,
        slug: mangaSlug,
        lastChapter: currentChapterTitle,
        image,
      });
    })();
  }, []);
  return <></>;
};

export default AddMangaToHistoryClientComponent;
