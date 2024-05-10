import SearchBar from "./SearchBar";
import Icons from "./Icons";
const EndSection = () => {
  return (
    <>
      <div className="min-nav:justify-center flex w-4/12 min-w-64 items-center justify-start gap-2">
        <SearchBar />
        <Icons />
      </div>
    </>
  );
};
export default EndSection;
