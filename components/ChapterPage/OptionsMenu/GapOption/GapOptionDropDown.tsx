"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import GapsMenu from "./GapsMenu";
const gapOptions = [
  { name: "Small", value: "4px" },
  { name: "Medium", value: "8px" },
  { name: "Large", value: "16px" },
];
const GapOptionDropDown = () => {
  const [gapOptionDropDownVisibility, setGapOptionDropDownVisibility] =
    useState(false);
  return (
    <div className="">
      <button
        className="flex w-32 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500"
        onClick={() => {
          setGapOptionDropDownVisibility((prev) => !prev);
        }}
      >
        <span>{gapOptions[0].name}</span>
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
