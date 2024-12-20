"use client";
import { IoIosOptions } from "react-icons/io";
import OptionsMenu from "./options-menu/OptionsMenu";
import SquaredIcon from "../lib/SquaredIcon";
import SquaredIconButton from "../lib/SquaredIconButton";
import { useState } from "react";

const OptionsButton = ({ image, name }: { image: string; name: string }) => {
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
        image={image}
        name={name}
      />
    </>
  );
};
export default OptionsButton;
