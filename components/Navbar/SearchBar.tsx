import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <>
      <div className="very-small-nav:flex hidden w-8/12 items-center justify-center rounded-lg border border-neutral-800">
        <form className="flex w-full  flex-shrink items-center justify-center">
          <input
            type="text"
            className="w-10/12 bg-default-white outline-none"
            placeholder="Search..."
          />
          <button type="submit" className="w-1/12" aria-label="Search button">
            <FaSearch className="" />
          </button>
        </form>
      </div>
      <div className="very-small-nav:hidden flex w-7/12 items-center justify-end">
        <button className="size-10 w-4/12" aria-label="Search button">
          <FaSearch className="size-6" />
        </button>
      </div>
    </>
  );
};
export default SearchBar;
