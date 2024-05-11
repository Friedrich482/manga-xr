import { RxHamburgerMenu } from "react-icons/rx";
const MenuBurgerButton = () => {
  return (
    <div className="large-nav:hidden small-nav:w-1/12 flex w-2/12 items-center justify-center">
      <button
        className="rounded-lg p-2 hover:bg-neutral-300"
        aria-label="Toggle Vertical Navbar"
      >
        <RxHamburgerMenu className="size-6 flex-shrink" />
      </button>
    </div>
  );
};
export default MenuBurgerButton;
