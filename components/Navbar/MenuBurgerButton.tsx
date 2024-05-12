import { RxHamburgerMenu } from "react-icons/rx";
const MenuBurgerButton = () => {
  return (
    <div className="flex w-2/12 items-center justify-center small-nav:w-1/12 large-nav:hidden">
      <button
        className="rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        aria-label="Toggle Vertical Navbar"
      >
        <RxHamburgerMenu className="size-6 flex-shrink" />
      </button>
    </div>
  );
};
export default MenuBurgerButton;
