import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <div className="flex w-8/12 items-center justify-center rounded-lg border border-neutral-800">
      <form className="flex w-full  flex-shrink items-center justify-center">
        <input
          type="text"
          className="w-10/12 bg-default-white outline-none"
          placeholder="Search..."
        />
        <button type="submit" className="w-1/12">
          <FaSearch className="" />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
