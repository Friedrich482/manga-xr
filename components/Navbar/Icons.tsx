"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import ThemeMenu from "./ThemeMenu";
import { useState } from "react";
import AuthMenu from "./AuthMenu";
const Icons = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  const [authMenuVisibility, setAuthMenuVisibility] = useState(false);
  const buttons = [
    {
      Icon: MdDarkMode,
      ariaLabel: "Toggle dark mode",
      handleClick: () => {
        setThemeMenuVisibility((prev) => !prev);
      },
    },
    {
      Icon: FaUser,
      ariaLabel: "User's profile",
      handleClick: () => {
        setAuthMenuVisibility((prev) => !prev);
      },
    },
  ];
  return (
    <>
      <div className="flex w-4/12 min-w-24 items-center justify-center gap-1">
        {buttons.map((button) => {
          const { Icon, ariaLabel, handleClick } = button;
          return (
            <button
              key={ariaLabel}
              className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
              aria-label={ariaLabel}
              onClick={handleClick}
            >
              <Icon className="size-6 text-neutral-800 dark:text-neutral-300" />
            </button>
          );
        })}
      </div>
      <ThemeMenu
        themeMenuVisibility={themeMenuVisibility}
        setThemeMenuVisibility={setThemeMenuVisibility}
      />
      <AuthMenu
        authMenuVisibility={authMenuVisibility}
        setAuthMenuVisibility={setAuthMenuVisibility}
      />
    </>
  );
};
export default Icons;
