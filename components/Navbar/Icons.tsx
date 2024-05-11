"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import ThemeMenu from "./ThemeMenu";
import { useState } from "react";
const Icons = () => {
  const [themeMenu, setThemeMenu] = useState(false);
  const handleThemeButtonClick = () => {
    setThemeMenu((prev) => !prev);
  };
  return (
    <>
      <div className="flex w-4/12 min-w-24 items-center justify-center gap-1">
        <button
          className="rounded-lg p-2 hover:bg-neutral-300"
          aria-label="Toggle dark mode"
          onClick={() => {
            handleThemeButtonClick();
          }}
        >
          <MdDarkMode className="size-6" />
        </button>
        <Link href={"/"}>
          <button
            className="rounded-lg p-2 hover:bg-neutral-300"
            aria-label="User's profile"
          >
            <FaUser className="size-6" />
          </button>
        </Link>
      </div>
      <ThemeMenu />
    </>
  );
};
export default Icons;
