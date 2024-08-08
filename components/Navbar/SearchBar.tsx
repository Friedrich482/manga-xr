"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import searchManga from "@/actions/searchManga";
import toast from "react-hot-toast";
import { mangaSearchSchema } from "@/zod-schema/schema";
import Form from "../lib/Form";
import CloseButton from "../lib/CloseButton";
import SearchBarTextInput from "./SearchBarTextInput";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
import SubmitSearchButton from "./SubmitSearchButton";
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
      <div className="hidden w-8/12 items-center justify-center very-small-nav:flex">
        <Form className="w-full flex-row" action={clientAction}>
          <SearchBarTextInput
            mangaInput={mangaInput}
            setMangaInput={setMangaInput}
          />
          <SubmitSearchButton />
        </Form>
      </div>

      {/* These divS only appears on `very-small` screens */}

      <div className="flex w-7/12 items-center justify-center very-small-nav:hidden">
        <SquaredIconButton
          className="size-10"
          aria-label="Search button"
          onClick={() => {
            setSearchBarVisibility(true);
          }}
        >
          <SquaredIcon icon={FaSearch} />
        </SquaredIconButton>
      </div>
      {searchBarVisibility && (
        <Form
          className="absolute left-3 z-10 h-10 w-11/12 flex-row items-center justify-center bg-default-white dark:bg-default-black very-small-nav:hidden"
          action={clientAction}
        >
          <SearchBarTextInput
            mangaInput={mangaInput}
            setMangaInput={setMangaInput}
          />
          <SubmitSearchButton className="rounded-r-none" />
          <CloseButton
            className="size-10 flex-shrink-0 self-center rounded-l-none border border-neutral-800/50 p-0 dark:border-neutral-600/50"
            aria-label="Close button"
            onClick={() => {
              setSearchBarVisibility(false);
            }}
          />
        </Form>
      )}
    </>
  );
};
export default SearchBar;
