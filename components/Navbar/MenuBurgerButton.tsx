import useToggleScroll from "@/hooks/useToggleScroll";
import { VerticalNavProps } from "@/types/navbar-types";
import { RxHamburgerMenu } from "react-icons/rx";
import SquaredIconButton from "../lib/SquaredIconButton";
import SquaredIcon from "../lib/SquaredIcon";
const MenuBurgerButton = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: VerticalNavProps) => {
  useToggleScroll(verticalNavVisibility);
  return (
    <div className="flex w-2/12 items-center justify-center small-nav:w-1/12 large-nav:hidden">
      <SquaredIconButton
        aria-label="Toggle Vertical Navbar"
        onClick={() => {
          setVerticalNavVisibility(true);
        }}
      >
        <SquaredIcon icon={RxHamburgerMenu} />
      </SquaredIconButton>
    </div>
  );
};
export default MenuBurgerButton;
