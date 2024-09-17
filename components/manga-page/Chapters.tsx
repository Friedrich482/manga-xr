"use client";
import { CHAPTERS_TO_DISPLAY } from "@/lib/constants";
import { ChapterType } from "@/zod-schema/schema";
import ChaptersList from "./ChaptersList";
import SearchChapterForm from "./SearchChapterForm";
import ShowChaptersButton from "./ShowChaptersButton";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import { useState } from "react";

const Chapters = ({
  chapters,
  mangaSlug,
  chaptersRead,
  lastChapterReadObject,
  bookmarkedChapters,
}: {
  chapters: ChapterType[];
  mangaSlug: string;
  chaptersRead:
    | {
        mangaSlug: string;
        chapter: string;
      }[]
    | undefined;
  lastChapterReadObject: {
    mangaSlug: string;
    lastChapterRead: string;
  };
  bookmarkedChapters:
    | Awaited<ReturnType<typeof getAllMangaBookmarks>>
    | undefined;
}) => {
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [finalData, setFinalData] = useState("");

  return (
    <div className="flex w-11/12 flex-col items-start justify-start gap-4 place-self-start text-xl very-small-nav:text-2xl">
      <h2 className="w-full text-center text-3xl">
        Chapters <span className="text-white">:</span>
      </h2>
      <SearchChapterForm finalData={finalData} setFinalData={setFinalData} />
      <ChaptersList
        finalData={finalData}
        mangaSlug={mangaSlug}
        chapters={
          finalData === ""
            ? showAllChapters
              ? chapters
              : chapters.slice(0, CHAPTERS_TO_DISPLAY)
            : chapters.filter((chapter) =>
                chapter.chapterTitle
                  .toLowerCase()
                  .includes(finalData.toLowerCase()),
              )
        }
        chaptersRead={chaptersRead}
        lastChapterReadObject={lastChapterReadObject}
        bookmarkedChapters={bookmarkedChapters}
      />

      {finalData === "" ? (
        chapters.length >= CHAPTERS_TO_DISPLAY ? (
          <div className="flex w-full flex-col gap-1">
            {showAllChapters ? "" : <div className="text-primary">...</div>}

            <ShowChaptersButton
              showAllChapters={showAllChapters}
              setShowAllChapters={setShowAllChapters}
            />
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </div>
  );
};
export default Chapters;
