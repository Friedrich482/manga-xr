"use client";

import { MangaSearchForm, mangaSearchFormSchema } from "@/zod-schema/schema";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CloseButton from "../lib/CloseButton";
import { FaSearch } from "react-icons/fa";
import Form from "../lib/Form";
import SearchBarTextInput from "./SearchBarTextInput";
import SquaredIcon from "../lib/SquaredIcon";
import SquaredIconButton from "../lib/SquaredIconButton";
import SubmitSearchButton from "./SubmitSearchButton";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const SearchBar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MangaSearchForm>({
    resolver: zodResolver(mangaSearchFormSchema),
  });
  const router = useRouter();
  const pathName = usePathname();
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);

  const clientAction = async (data: MangaSearchForm) => {
    const parsedData = mangaSearchFormSchema.safeParse(data);
    if (!parsedData.success) {
      let errorMessage = "";
      parsedData.error.issues.forEach((issue) => {
        errorMessage += issue.message;
      });
      toast.error(errorMessage.replace("String", "Manga to search"));
      return;
    }
    router.push(
      `/search?name=${parsedData.data.name.toLowerCase().trim().replaceAll(" ", "+")}`,
    );
  };
  useEffect(() => {
    if (pathName !== "/search") {
      reset();
    }
  }, [pathName]);
  return (
    <>
      <div className="hidden w-8/12 items-center justify-center very-small-nav:flex">
        <Form className="w-full flex-row" onSubmit={handleSubmit(clientAction)}>
          <SearchBarTextInput {...register("name")} />
          <SubmitSearchButton
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
          />
        </Form>
      </div>

      <div className="flex w-7/12 items-center justify-center very-small-nav:hidden">
        <SquaredIconButton
          className="flex size-10 items-center justify-center"
          aria-label="Search button"
          onClick={() => {
            setSearchBarVisibility(true);
          }}
        >
          <SquaredIcon icon={FaSearch} />
        </SquaredIconButton>
      </div>
      {searchBarVisibility && (
        //Form for small screen
        <Form
          className="absolute right-3 z-20 h-10 w-[145%] flex-row items-center gap-0 self-center bg-default-white dark:bg-default-black very-small-nav:hidden"
          onSubmit={handleSubmit(clientAction)}
        >
          <SearchBarTextInput {...register("name")} />
          <SubmitSearchButton
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            className="rounded-r-none"
          />
          <CloseButton
            className="size-10 shrink-0 self-center rounded-l-none border border-neutral-800/50 p-0 dark:border-neutral-600/50"
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
