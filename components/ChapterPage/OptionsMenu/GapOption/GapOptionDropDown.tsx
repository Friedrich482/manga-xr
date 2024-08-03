"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import GapsMenu from "./GapsMenu";
import useStore from "@/hooks/store";
import { twMerge as tm } from "tailwind-merge";
import DropDownButton from "@/components/lib/DropDownButton";
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
    <>
      <DropDownButton
        onClick={() => {
          setGapOptionDropDownVisibility((prev) => !prev);
        }}
        disabled={chapterPagesDisposition === "Single Page"}
      >
        {gapOption.name}
        <FaCaretDown className="self-center" />
      </DropDownButton>
      <GapsMenu
        gapOptionDropDownVisibility={gapOptionDropDownVisibility}
        setGapOptionDropDownVisibility={setGapOptionDropDownVisibility}
      />
    </>
  );
};
export { GapOptionDropDown as default, gapOptions };
