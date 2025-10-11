"use client";
import { Dispatch, SetStateAction } from "react";
import BookmarkOption from "./gap-option/BookmarkOption";
import ChapterPagesDispositionOption from "./ChapterPagesDispositionOption";
import CloseButton from "@/components/lib/CloseButton";
import GapOption from "./gap-option/GapOption";
import ProgressBarDirectionOption from "./ProgressBarDirectionOption";
import ReadingDirectionOption from "./ReadingDirectionOption";
import WidthOption from "./WidthOption";
import { twMerge as tm } from "tailwind-merge";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";

const OptionsMenu = ({
  optionsMenuVisibility,
  setOptionsMenuVisibility,
  image,
  name,
  mangaSlug,
  currentChapterTitle,
}: {
  optionsMenuVisibility: boolean;
  setOptionsMenuVisibility: Dispatch<SetStateAction<boolean>>;
  image: string;
  name: string;
  mangaSlug: string;
  currentChapterTitle: string;
}) => {
  const ref = useHandleOutsideClick(
    optionsMenuVisibility,
    setOptionsMenuVisibility,
  );

  useToggleScroll(optionsMenuVisibility);
  return (
    <div
      className={tm(
        "bg-default-white dark:bg-default-black fixed -top-2 z-50 flex max-h-screen min-h-94 w-[77vw] min-w-56 flex-col overflow-y-scroll rounded-lg border border-neutral-800 px-4 pt-10 pb-5 transition duration-500 ease-in-out",
        !optionsMenuVisibility && "-translate-y-[1000px]",
      )}
      ref={ref}
    >
      <CloseButton onClick={() => setOptionsMenuVisibility(false)} />
      <ul className="divide-primary/30 flex size-full flex-col gap-5 divide-y-[1px] divide-y-reverse pt-2">
        <WidthOption />
        <GapOption />
        <ProgressBarDirectionOption />
        <ChapterPagesDispositionOption />
        <ReadingDirectionOption />
        <BookmarkOption
          image={image}
          name={name}
          mangaSlug={mangaSlug}
          currentChapterTitle={currentChapterTitle}
        />
      </ul>
    </div>
  );
};
export default OptionsMenu;
