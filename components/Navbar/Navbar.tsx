import TitleSection from "./TitleSection";
import EndSection from "./EndSection";
import HorizontalNavList from "./HorizontalNavList";
import VerySmallNavBurger from "./VerySmallNavBurger";
const Navbar = () => {
  return (
    <nav className="mt-2 flex w-full flex-row items-center justify-center">
      <VerySmallNavBurger />
      <TitleSection />
      <HorizontalNavList />
      <EndSection />
    </nav>
  );
};
export default Navbar;
