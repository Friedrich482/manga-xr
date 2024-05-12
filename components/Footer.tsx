import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center text-base text-neutral-700 dark:text-neutral-300">
      <div>
        Made by{" "}
        <span className="underline hover:text-black dark:hover:text-white">
          <Link href={"https://github.com/Friedrich482"} target="_blank">
            Friedrich482
          </Link>
        </span>
        . The code source is available on{" "}
        <span className="underline hover:text-black dark:hover:text-white">
          <Link
            href={"https://github.com/Friedrich482/manga-reading-app"}
            target="_blank"
          >
            Github
          </Link>
          .
        </span>
      </div>
    </footer>
  );
};
export default Footer;
