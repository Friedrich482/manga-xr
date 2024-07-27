"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import ThemeMenu from "./ThemeMenu";
import { useState } from "react";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import Link from "next/link";
const Icons = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  return (
    <>
      <div className="flex w-4/12 min-w-24 items-center justify-center gap-1">
        <SquaredIconButton
          aria-label="Toggle dark mode"
          onClick={() => {
            setThemeMenuVisibility((prev) => !prev);
          }}
        >
          <SquaredIcon icon={MdDarkMode} />
        </SquaredIconButton>
        <Link href="/login">
          <SquaredIconButton aria-label="Login">
            <SquaredIcon icon={FaUser} />
          </SquaredIconButton>
        </Link>
      </div>
      <ThemeMenu
        themeMenuVisibility={themeMenuVisibility}
        setThemeMenuVisibility={setThemeMenuVisibility}
      />
    </>
  );
};
export default Icons;
