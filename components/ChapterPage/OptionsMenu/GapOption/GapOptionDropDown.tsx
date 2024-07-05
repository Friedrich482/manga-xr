"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import GapsMenu from "./GapsMenu";
import useStore from "@/hooks/store";
import { twMerge as tm } from "tailwind-merge";
const gapOptions = [
  { name: "No gap", value: "0rem" },
  { name: "Small", value: "0.5rem" },
  { name: "Medium", value: "1rem" },
  { name: "Large", value: "3rem" },
];
const GapOptionDropDown = () => {
  const [gapOptionDropDownVisibility, setGapOptionDropDownVisibility] =
    useState(false);
  const { gapOption, chapterPagesDisposition } = useStore((state) => ({
    gapOption: state.gapOption,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  return (
    <div className="">
      <button
        className={tm(
          "z-50 flex w-32 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 transition duration-300 ease-in-out  hover:border-neutral-500 disabled:text-neutral-500/50 disabled:hover:border-neutral-500/50",
          chapterPagesDisposition === "Single Page" && "cursor-not-allowed",
        )}
        onClick={() => {
          setGapOptionDropDownVisibility((prev) => !prev);
        }}
        disabled={chapterPagesDisposition === "Single Page"}
      >
        <span>{gapOption.name}</span>
        <div className="h-full">
          <FaCaretDown />
        </div>
      </button>
      <GapsMenu
        gapOptionDropDownVisibility={gapOptionDropDownVisibility}
        setGapOptionDropDownVisibility={setGapOptionDropDownVisibility}
      />
    </div>
  );
};
export { GapOptionDropDown as default, gapOptions };
