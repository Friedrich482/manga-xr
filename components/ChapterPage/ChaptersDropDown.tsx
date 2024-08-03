"use client";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChaptersMenu from "./ChaptersMenu";
import { chapterType } from "@/zod-schema/schema";
import useStore from "@/hooks/store";
import useGetCurrentChapterTitle from "@/hooks/ChapterImagesHooks/useGetCurrentChapterTitle";
import DropDownButton from "../lib/DropDownButton";

const ChaptersDropDown = ({ chapters }: { chapters: chapterType[] }) => {
  const [chaptersMenuVisibility, setChaptersMenuVisibility] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { setChaptersButtonPosition } = useStore((state) => ({
    setChaptersButtonPosition: state.setChaptersButtonPosition,
  }));
  const currentChapterTitle = useGetCurrentChapterTitle(chapters);
  return (
    <>
      <DropDownButton
        ref={ref}
        onClick={() => {
          setChaptersMenuVisibility((prev) => !prev);
        }}
        onMouseEnter={() => {
          const rect = ref?.current?.getBoundingClientRect();
          const position = rect?.top;
          if (position) {
            setChaptersButtonPosition(position);
          }
        }}
      >
        {currentChapterTitle}
        <FaCaretDown className="self-center" />
      </DropDownButton>
      <ChaptersMenu
        chaptersMenuVisibility={chaptersMenuVisibility}
        setChaptersMenuVisibility={setChaptersMenuVisibility}
        chapters={chapters}
        currentChapterTitle={currentChapterTitle}
      />
    </>
  );
};
export default ChaptersDropDown;
