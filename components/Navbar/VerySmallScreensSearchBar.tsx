"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import searchFormAction from "@/actions/searchManga";

const VerySmallScreensSearchBar = () => {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);

  return (
    <>
      {/* These divS only appears on `very-small` screens */}

      <div className="flex w-7/12 items-center justify-end very-small-nav:hidden">
        <button className="size-10 w-4/12" aria-label="Search button">
          <FaSearch
            className="size-6 text-neutral-800 dark:text-neutral-300"
            onClick={() => {
              setSearchBarVisibility(true);
            }}
          />
        </button>
      </div>
      {searchBarVisibility && (
        <div className="absolute right-3 z-10 flex h-9 w-11/12 items-center justify-center rounded-lg border border-neutral-800 bg-default-white dark:bg-default-black very-small-nav:hidden">
          <form
            className="flex h-full w-full flex-shrink items-center justify-center"
            action={searchFormAction}
          >
            <input
              type="text"
              className="w-10/12 bg-transparent outline-none dark:text-white"
              placeholder="Search..."
            />
            <button
              className="w-1/12"
              aria-label="Close button"
              onClick={() => {
                setSearchBarVisibility(false);
              }}
            >
              <IoIosCloseCircleOutline className="size-6 text-neutral-800 hover:text-black dark:text-neutral-400 dark:hover:text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default VerySmallScreensSearchBar;
