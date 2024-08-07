import { Dispatch, SetStateAction } from "react";
import FormInput from "../lib/FormInput";
import { twMerge as tm } from "tailwind-merge";

const SearchBarTextInput = ({
  mangaInput,
  setMangaInput,
  className,
}: {
  mangaInput: string;
  setMangaInput: Dispatch<SetStateAction<string>>;
  className?: string;
}) => {
  return (
    <FormInput
      type="text"
      value={mangaInput}
      placeholder="Search..."
      name="search-manga"
      className="border-r-transparent"
      onChange={(e) => {
        setMangaInput(e.target.value);
      }}
    />
  );
};
export default SearchBarTextInput;
