import SearchBar from "./SearchBar";
import Icons from "./Icons";
const EndSection = () => {
  return (
    <>
      <div className="very-small:w-7/12 flex w-8/12 min-w-44 items-center justify-start gap-2 large-nav:mr-4 large-nav:w-4/12 large-nav:justify-center">
        <SearchBar />
        <Icons />
      </div>
    </>
  );
};
export default EndSection;
