import EndSection from "./EndSection";
import HorizontalNavList from "./HorizontalNavList";
import TitleSection from "./TitleSection";
import VerySmallNavBurger from "./VerySmallNavBurger";
const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex w-svw flex-row items-center justify-center border-b border-b-neutral-700 bg-zinc-100 py-2 dark:bg-default-black">
      <VerySmallNavBurger />
      <TitleSection />
      <HorizontalNavList />
      <EndSection />
    </nav>
  );
};
export default Navbar;
