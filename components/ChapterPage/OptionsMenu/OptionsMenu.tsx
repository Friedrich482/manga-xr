"use client";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import { Dispatch, SetStateAction, useEffect } from "react";
import useStore from "@/hooks/store";
import WidthOption from "./WidthOption";
import { GapOption } from "./GapOption";
import ProgressBarDirectionOption from "./ProgressBarDirectionOption";
import { twMerge as tm } from "tailwind-merge";
import ChapterPagesDispositionOption from "./ChapterPagesDispositionOption";
import ReadingDirectionOption from "./ReadingDirectionOption";
import { IoIosClose } from "react-icons/io";
const OptionsMenu = ({
  optionsMenuVisibility,
  setOptionsMenuVisibility,
}: {
  optionsMenuVisibility: boolean;
  setOptionsMenuVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  // handle outside click to close the menu
  const ref = useHandleOutsideClick(
    optionsMenuVisibility,
    setOptionsMenuVisibility,
  );

  // disable the scroll when the menu is open
  useToggleScroll(optionsMenuVisibility);

  const { setMaxWidth } = useStore((state) => ({
    setMaxWidth: state.setMaxWidth,
  }));

  // control the max width at each screen resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMaxWidth(window.innerWidth);
    });
  }, [setMaxWidth]);
  return (
    <div className="fixed z-50">
      <div
        className={tm(
          "fixed -top-1 flex max-h-screen w-[80vw] min-w-56 flex-col overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-4 pb-4 pt-10 transition duration-500 ease-in-out dark:bg-default-black",
          !optionsMenuVisibility && "-translate-y-[800px]",
        )}
        ref={ref}
      >
        <button
          className="size-8 cursor-pointer place-self-end rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600/50"
          title="Close"
          aria-label="Close"
          onClick={() => setOptionsMenuVisibility(false)}
        >
          <IoIosClose className="m-auto size-full font-bold" />
        </button>
        <ul className="size-full pt-2">
          <WidthOption />
          <GapOption />
          <ProgressBarDirectionOption />
          <ChapterPagesDispositionOption />
          <ReadingDirectionOption />
        </ul>
      </div>
    </div>
  );
};
export default OptionsMenu;
