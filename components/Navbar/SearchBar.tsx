import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <>
      <div className="hidden w-8/12 items-center justify-center rounded-lg border border-neutral-800 very-small-nav:flex">
        <form className="flex w-full  flex-shrink items-center justify-center">
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
      {/* This div only appears on `very-small` screens */}
      <div className="flex w-7/12 items-center justify-end very-small-nav:hidden">
        <button className="size-10 w-4/12" aria-label="Search button">
          <FaSearch className="size-6 text-neutral-800 dark:text-neutral-300" />
        </button>
      </div>
    </>
  );
};
export default SearchBar;
