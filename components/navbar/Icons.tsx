import AuthDropDown from "./AuthDropDown";
import ThemeDropDown from "./ThemeDropDown";
const Icons = () => {
  return (
    <div className="max-large-nav:pr-4 flex w-4/12 min-w-24 items-center justify-center gap-2 pr-1">
      <ThemeDropDown />
      <AuthDropDown />
    </div>
  );
};
export default Icons;
