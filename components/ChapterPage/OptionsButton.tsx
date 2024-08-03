"use client";
import { IoIosOptions } from "react-icons/io";
import { OptionsMenu } from "./OptionsMenu";
import { useState } from "react";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";

const OptionsButton = () => {
  const [optionsMenuVisibility, setOptionsMenuVisibility] = useState(false);
  return (
    <>
      <SquaredIconButton
        className="fixed left-2 top-20"
        aria-label="More options..."
        title="More options..."
        onClick={() => {
          setOptionsMenuVisibility((prev) => !prev);
        }}
      >
        <SquaredIcon icon={IoIosOptions} className="size-5" />
      </SquaredIconButton>
      <OptionsMenu
        optionsMenuVisibility={optionsMenuVisibility}
        setOptionsMenuVisibility={setOptionsMenuVisibility}
      />
    </>
  );
};
export default OptionsButton;
