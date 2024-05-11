import Link from "next/link";
import Image from "next/image";
const TitleSection = () => {
  return (
    <Link
      href={"/"}
      className="flex w-2/12 cursor-pointer items-center justify-center gap-2 very-small-nav:w-4/12 small-nav:w-4/12 large-nav:w-3/12"
    >
      <Image
        className="aspect-square min-w-10 rounded-full"
        src={`/assets/logo.svg`}
        alt={"logo"}
        width={40}
        height={40}
        priority={false}
      />
      <span className="hidden text-end text-xl font-extrabold text-black very-small-nav:flex small-nav:text-3xl dark:text-white">
        Manga-R
      </span>
    </Link>
  );
};
export default TitleSection;
