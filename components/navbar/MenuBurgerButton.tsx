import { Dispatch, SetStateAction } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SquaredIcon from "../lib/SquaredIcon";
import SquaredIconButton from "../lib/SquaredIconButton";
import useToggleScroll from "@/hooks/useToggleScroll";
const MenuBurgerButton = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: {
  verticalNavVisibility: boolean;
  setVerticalNavVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
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
