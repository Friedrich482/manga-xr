"use client";

import LargeSubmitFormButton from "./SubmitButton/LargeScreensButton";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SmallSubmitFormButton from "./SubmitButton/SmallScreenButton";
import searchManga from "@/actions/searchManga";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { mangaSearchSchema } from "@/zod-schema/schema";
const SearchBar = () => {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const [mangaInput, setMangaInput] = useState("");

  const clientAction = async (formData: FormData) => {
    const parsedData = mangaSearchSchema.safeParse(
      formData.get("search-manga"),
    );
    if (!parsedData.success) {
      let errorMessage = "";
      parsedData.error.issues.forEach((issue) => {
        errorMessage += issue.message;
      });
      toast.error(errorMessage.replace("String", "Manga to search"));
      return;
    }

    // empty the manga to search field
    setMangaInput("");

    const error = await searchManga(parsedData.data);
    if (error) {
      toast.error(error);
    }
  };
  // The two forms are controlled by the same state. The advantage is that if the user reduce or increase the screen width, if he has already started to fill the form, the value will be conserved
  return (
    <>
      <div className="hidden w-8/12 items-center justify-center rounded-lg border border-neutral-800 very-small-nav:flex">
        <form
          className="flex w-full flex-shrink items-center justify-center"
          action={clientAction}
        >
          <input
            type="text"
            value={mangaInput}
            className="w-10/12 bg-transparent outline-none dark:text-white"
            placeholder="Search..."
            name="search-manga"
            onChange={(e) => {
              setMangaInput(e.target.value);
            }}
          />
          <LargeSubmitFormButton />
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
        <div className="absolute right-3 z-10 flex h-9 w-11/12 items-center justify-center rounded-lg border border-neutral-800 bg-default-white dark:bg-default-black very-small-nav:hidden">
          <form
            className="flex h-full w-full flex-shrink items-center justify-center"
            action={clientAction}
          >
            <input
              type="text"
              className="w-10/12 bg-transparent outline-none dark:text-white"
              placeholder="Search..."
              required
              value={mangaInput}
              name="search-manga"
              onChange={(e) => {
                setMangaInput(e.target.value);
              }}
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
            <SmallSubmitFormButton />
          </form>
        </div>
      )}
    </>
  );
};
export default SearchBar;
