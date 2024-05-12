import TitleSection from "./TitleSection";
import EndSection from "./EndSection";
import HorizontalNavList from "./HorizontalNavList";
import MenuBurgerButton from "./MenuBurgerButton";
import VerticalNavList from "./VerticalNavList";
const Navbar = () => {
  return (
    <nav className="mt-2 flex w-full flex-row items-center justify-center">
      <VerticalNavList />
      <MenuBurgerButton />
      <TitleSection />
      <HorizontalNavList />
      <EndSection />
    </nav>
  );
};
export default Navbar;
