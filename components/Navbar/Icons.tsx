import AuthDropDown from "./AuthDropDown";
import ThemeDropDown from "./ThemeDropDown";
const Icons = () => {
  return (
    <div className="flex w-4/12 min-w-24 items-center justify-center gap-2 pr-2 max-large-nav:pr-4">
      <ThemeDropDown /> <AuthDropDown />
    </div>
  );
};
export default Icons;
