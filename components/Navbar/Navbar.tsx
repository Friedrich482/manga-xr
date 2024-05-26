import TitleSection from "./TitleSection";
import EndSection from "./EndSection";
import HorizontalNavList from "./HorizontalNavList";
import VerySmallNavBurger from "./VerySmallNavBurger";
const Navbar = () => {
  return (
    <nav className="fixed z-50 flex w-svw flex-row items-center justify-center border-b border-b-neutral-700 bg-zinc-100 pb-2 pt-2 dark:bg-transparent dark:backdrop-blur dark:backdrop-brightness-75">
      <VerySmallNavBurger />
      <TitleSection />
      <HorizontalNavList />
      <EndSection />
    </nav>
  );
};
export default Navbar;
