"use client";
import { IoIosOptions } from "react-icons/io";
import OptionsMenu from "./OptionsMenu";
import { useState } from "react";

const OptionsButton = () => {
  const [optionsMenuVisibility, setOptionsMenuVisibility] = useState(false);
  return (
    <div>
      <button
        className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        aria-label="More options..."
        onClick={() => {
          setOptionsMenuVisibility((prev) => !prev);
        }}
      >
        <IoIosOptions className="size-5 text-neutral-800 dark:text-neutral-300" />
      </button>
      <OptionsMenu
        optionsMenuVisibility={optionsMenuVisibility}
        setOptionsMenuVisibility={setOptionsMenuVisibility}
      />
    </div>
  );
};
export default OptionsButton;
