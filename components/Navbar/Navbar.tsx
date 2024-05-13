import TitleSection from "./TitleSection";
import EndSection from "./EndSection";
import HorizontalNavList from "./HorizontalNavList";
import VerySmallNavBurger from "./VerySmallNavBurger";
const Navbar = () => {
  return (
    <nav className="sticky mt-2 flex w-svw flex-row items-center justify-center border-b border-b-neutral-700 pb-2 backdrop:backdrop-blur-sm">
      <VerySmallNavBurger />
      <TitleSection />
      <HorizontalNavList />
      <EndSection />
    </nav>
  );
};
export default Navbar;
