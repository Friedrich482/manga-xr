"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import ChaptersList from "./ChaptersList";
import { chapterSearchSchema } from "@/zod-schema/schema";
import toast from "react-hot-toast";
import FormButtons from "./FormButtons";
const Chapters = ({
  chapters,
  altTitle,
}: {
  chapters: { chapterTitle: string; chapterReleaseDate: string }[];
  altTitle: string;
}) => {
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [chapterToSearch, setChapterToSearch] = useState("");
  const [finalData, setFinalData] = useState("");

  const chapterFormClientAction = async (formData: FormData) => {
    const chapterSearched = formData.get("chapter");
    const parsedChapter = chapterSearchSchema.safeParse(chapterSearched);
    if (!parsedChapter.success) {
      let errorMessage = "";
      parsedChapter.error.issues.forEach((issue) => {
        errorMessage += issue.message;
      });
      toast.error(errorMessage.replace("String", "Chapter"));
      return;
    }
    // grab the final data from the client action by setting the finalData variable to that
    setFinalData(parsedChapter.data);
  };
  return (
    <div className="mt-6 flex w-11/12 flex-col items-start justify-start place-self-start text-xl very-small-nav:text-2xl">
      <h2 className="mb-6 w-full text-center text-3xl">
        Chapters <span className="text-white">:</span>
      </h2>
      <form
        className="mb-8 flex w-11/12 flex-wrap items-center justify-start gap-2 place-self-start"
        action={chapterFormClientAction}
      >
        <input
          onChange={(e) => {
            setChapterToSearch(e.target.value);
          }}
          type="text"
          value={chapterToSearch}
          name="chapter"
          min={0}
          required
          placeholder="Enter a chapter..."
          className="min-w-48 max-w-80 rounded-lg border border-neutral-800/50 py-1 pl-7 placeholder:text-neutral-600/95 focus:border-neutral-800 focus:outline-none dark:border-neutral-500/50 dark:placeholder:text-neutral-300/55 dark:focus:border-neutral-500"
        />
        <FormButtons
          finalData={finalData}
          setChapterToSearch={setChapterToSearch}
          setFinalData={setFinalData}
        />
      </form>

      <ChaptersList
        finalData={finalData}
        altTitle={altTitle}
        chapters={
          finalData === ""
            ? showAllChapters
              ? chapters
              : chapters.slice(0, 20)
            : chapters.filter(
                (chapter) => chapter.chapterTitle.indexOf(finalData) !== -1,
              )
        }
      />

      {finalData === "" ? (
        chapters.length >= 20 ? (
          <div className="flex w-full flex-col gap-1">
            {showAllChapters ? "" : <div className="text-orange-400">...</div>}

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
        )
      ) : (
        <></>
      )}
    </div>
  );
};
export default Chapters;
