import useToggleScroll from "@/hooks/useToggleScroll";
import { VerticalNavProps } from "@/types/navbar-types";
import { RxHamburgerMenu } from "react-icons/rx";
const MenuBurgerButton = ({
  verticalNavVisibility,
  setVerticalNavVisibility,
}: VerticalNavProps) => {
  useToggleScroll(verticalNavVisibility);
  return (
    <div className="flex w-2/12 items-center justify-center small-nav:w-1/12 large-nav:hidden">
      <button
        className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        aria-label="Toggle Vertical Navbar"
        onClick={() => {
          setVerticalNavVisibility(true);
        }}
      >
        <RxHamburgerMenu className="size-6 flex-shrink" />
      </button>
    </div>
  );
};
export default MenuBurgerButton;
