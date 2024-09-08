import Icons from "./Icons";
import SearchBar from "./SearchBar";
const EndSection = () => {
  return (
    <>
      <div className="very-small:w-7/12 relative flex w-8/12 min-w-44 items-center justify-start gap-2 large-nav:right-2 large-nav:w-4/12 large-nav:justify-center">
        <SearchBar />
        <Icons />
      </div>
    </>
  );
};
export default EndSection;
