"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import ThemeMenu from "./ThemeMenu";
import { cache, useMemo, useState } from "react";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import Link from "next/link";
import useUser from "@/hooks/Auth/useUser";
const Icons = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  const user = cache(() => useUser());
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
        <Link
          href="/login"
          className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        >
          <SquaredIcon icon={FaUser} />
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
