import searchFormAction from "@/actions/searchManga";
import VerySmallScreensSearchBar from "./VerySmallScreensSearchBar";
import SubmitFormButton from "./SubmitFormButton";
const SearchBar = () => {
  return (
    <>
      <div className="hidden w-8/12 items-center justify-center rounded-lg border border-neutral-800 very-small-nav:flex">
        <form
          className="flex w-full flex-shrink items-center justify-center"
          action={searchFormAction}
        >
          <input
            type="text"
            className={`w-10/12 bg-transparent outline-none dark:text-white`}
            placeholder="Search..."
            required
            name="search-manga"
          />
          <SubmitFormButton />
        </form>
      </div>
      {/* This is a component that require some state, some I extract it a separate client component to not make all this component a client component */}
      <VerySmallScreensSearchBar />
    </>
  );
};
export default SearchBar;
