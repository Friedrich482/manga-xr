"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import GapsMenu from "./GapsMenu";
import useStore from "@/hooks/store";
const gapOptions = [
  { name: "No gap", value: "0px" },
  { name: "Small", value: "0.5rem" },
  { name: "Medium", value: "1rem" },
  { name: "Large", value: "3rem" },
];
const GapOptionDropDown = () => {
  const [gapOptionDropDownVisibility, setGapOptionDropDownVisibility] =
    useState(false);
  const { gapOption } = useStore();
  return (
    <div className="">
      <button
        className="flex w-32 items-center justify-around gap-x-3 rounded-lg border border-neutral-500/50 px-2 py-1 hover:border-neutral-500"
        onClick={() => {
          setGapOptionDropDownVisibility((prev) => !prev);
        }}
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
