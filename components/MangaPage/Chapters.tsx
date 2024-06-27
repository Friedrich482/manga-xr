"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import ChaptersList from "./ChaptersList";
const Chapters = ({ chapters }: { chapters: string[] }) => {
  const [showAllChapters, setShowAllChapters] = useState(false);

  return (
    <div className="mt-6 flex w-full flex-col items-start justify-start text-2xl">
      <h2 className="mb-6 w-full text-center text-3xl">
        Chapters <span className="text-white">:</span>
      </h2>
      <ChaptersList
        chapters={showAllChapters ? chapters : chapters.slice(0, 20)}
      />

      {chapters.length >= 20 ? (
        <div className="flex w-full flex-col gap-1">
          {showAllChapters ? "" : <span className="text-orange-400">...</span>}

          <button
            onClick={() => {
              setShowAllChapters((prev) => !prev);
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 place-self-center rounded-lg border border-transparent px-4 hover:border-neutral-500 hover:text-orange-400"
          >
            {showAllChapters ? (
              <>
                Show less <FaCaretUp className="size-6" />
              </>
            ) : (
              <>
                Show all chapters <FaCaretDown />
              </>
            )}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Chapters;
