import CrossKatanaImage from "./CrossKatanaImage";
import Link from "next/link";
import Logo from "./Logo";
const TitleSection = () => {
  return (
    <Link
      href="/"
      className="flex w-2/12 shrink-0 cursor-pointer items-center justify-center gap-2 very-small-nav:w-4/12 small-nav:w-4/12 large-nav:w-3/12"
    >
      <Logo />
      <span className="hidden text-end text-xl font-extrabold text-black dark:text-white very-small-nav:flex small-nav:text-3xl">
        Manga
        <CrossKatanaImage /> R
      </span>
    </Link>
  );
};
export default TitleSection;
