"use client";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import ThemeMenu from "./ThemeMenu";
import { useEffect, useState } from "react";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import Link from "next/link";
import useUser, { PartialUser } from "@/hooks/Auth/useUser";
import Image from "next/image";
const Icons = () => {
  const [themeMenuVisibility, setThemeMenuVisibility] = useState(false);
  const { user, isLoading } = useUser();
  return (
    <>
      <div className="flex w-4/12 min-w-24 items-center justify-end gap-2 pr-2 max-large-nav:pr-4">
        <SquaredIconButton
          aria-label="Toggle dark mode"
          onClick={() => {
            setThemeMenuVisibility((prev) => !prev);
          }}
        >
          <SquaredIcon icon={MdDarkMode} />
        </SquaredIconButton>
        {isLoading && <p>loading..</p>}
        {user ? (
          <Image
            src={"/assets/avatars/one-piece/op1.svg"}
            alt="avatar"
            width={40}
            height={40}
            className="size-8 cursor-pointer rounded-full hue-rotate-[268deg]"
          />
        ) : (
          <Link
            href="/login"
            title="Login"
            className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          >
            <SquaredIcon icon={FaUser} />
          </Link>
        )}
      </div>
      <ThemeMenu
        themeMenuVisibility={themeMenuVisibility}
        setThemeMenuVisibility={setThemeMenuVisibility}
      />
    </>
  );
};
export default Icons;
