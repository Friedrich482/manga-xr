import { Dispatch, SetStateAction } from "react";
import FormInput from "../lib/FormInput";

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
      required={false}
      value={mangaInput}
      placeholder="Search..."
      name="search-manga"
      className="rounded-r-none"
      onChange={(e) => {
        setMangaInput(e.target.value);
      }}
    />
  );
};
export default SearchBarTextInput;
