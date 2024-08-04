"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import GapsMenu from "./GapsMenu";
import useStore from "@/hooks/store";
import DropDownButton from "@/components/lib/DropDownButton";
import DropDownWrapper from "@/components/lib/DropDownWrapper";
const GapOptionDropDown = () => {
  const [gapOptionDropDownVisibility, setGapOptionDropDownVisibility] =
    useState(false);
  const { gapOption, chapterPagesDisposition } = useStore((state) => ({
    gapOption: state.gapOption,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  return (
    <DropDownWrapper>
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
    </DropDownWrapper>
  );
};
export default GapOptionDropDown;
