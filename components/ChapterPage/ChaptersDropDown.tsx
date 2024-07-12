"use client";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import ChaptersMenu from "./ChaptersMenu";
import { chapterType } from "@/zod-schema/schema";
import { useParams } from "next/navigation";
import useStore from "@/hooks/store";

const ChaptersDropDown = ({ chapters }: { chapters: chapterType[] }) => {
  const { chapterSlug }: { chapterSlug: string } = useParams();
  const chapterTitleFromUrl = chapterSlug.replaceAll("-", " ");
  const [chaptersMenuVisibility, setChaptersMenuVisibility] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { setChaptersButtonPosition } = useStore((state) => ({
    setChaptersButtonPosition: state.setChaptersButtonPosition,
  }));
  return (
    <div className="">
      <button
        ref={ref}
        className="flex min-w-44 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500"
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
        <div>
          {chapterTitleFromUrl.charAt(0).toUpperCase() +
            chapterTitleFromUrl.slice(1)}
        </div>
        <div className="h-full">
          <FaCaretDown />
        </div>
      </button>
      <ChaptersMenu
        chaptersMenuVisibility={chaptersMenuVisibility}
        setChaptersMenuVisibility={setChaptersMenuVisibility}
        chapters={chapters}
      />
    </div>
  );
};
export default ChaptersDropDown;
