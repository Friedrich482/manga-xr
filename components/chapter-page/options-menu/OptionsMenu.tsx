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
}: {
  optionsMenuVisibility: boolean;
  setOptionsMenuVisibility: Dispatch<SetStateAction<boolean>>;
  image: string;
  name: string;
}) => {
  const ref = useHandleOutsideClick(
    optionsMenuVisibility,
    setOptionsMenuVisibility,
  );

  useToggleScroll(optionsMenuVisibility);
  return (
    <div
      className={tm(
        "fixed -top-2 z-50 flex max-h-screen min-h-[23.5rem] w-[77vw] min-w-56 flex-col overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-4 pb-5 pt-10 transition duration-500 ease-in-out dark:bg-default-black",
        !optionsMenuVisibility && "-translate-y-[1000px]",
      )}
      ref={ref}
    >
      <CloseButton onClick={() => setOptionsMenuVisibility(false)} />
      <ul className="flex size-full flex-col gap-5 divide-y divide-primary/30 pt-2">
        <WidthOption />
        <GapOption />
        <ProgressBarDirectionOption />
        <ChapterPagesDispositionOption />
        <ReadingDirectionOption />
        <BookmarkOption image={image} name={name} />
      </ul>
    </div>
  );
};
export default OptionsMenu;
