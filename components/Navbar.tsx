import TitleSection from "./TitleSection";
import EndSection from "./EndSection";
import NavList from "./NavList";
const Navbar = () => {
  return (
    <nav className="mt-2 flex w-full flex-row items-center justify-center">
      <TitleSection />
      <NavList />
      <EndSection />
    </nav>
  );
};
export default Navbar;
