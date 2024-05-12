"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
const SearchBar = () => {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  return (
    <>
      <div className="hidden w-8/12 items-center justify-center rounded-lg border border-neutral-800 very-small-nav:flex">
        <form className="flex w-full flex-shrink items-center justify-center">
          <input
            type="text"
            className="dark:bg-default-black w-10/12 bg-default-white outline-none dark:text-white"
            placeholder="Search..."
          />
          <button type="submit" className="w-1/12" aria-label="Search button">
            <FaSearch className="" />
          </button>
        </form>
      </div>

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
        <div className="dark:bg-default-black absolute right-3 z-10 flex h-9 w-11/12 items-center justify-center rounded-lg border border-neutral-800 bg-default-white very-small-nav:hidden">
          <form className="flex h-full w-full flex-shrink items-center justify-center">
            <input
              type="text"
              className="dark:bg-default-black w-10/12 bg-default-white outline-none dark:text-white"
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
export default SearchBar;
