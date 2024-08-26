import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full items-center justify-center pb-4 pt-8">
      <div className="w-full border-t border-t-neutral-700 pt-4 text-center text-base text-neutral-700 dark:text-neutral-300">
        Built by{" "}
        <span className="underline hover:text-black dark:hover:text-white">
          <Link href="https://github.com/Friedrich482" target="_blank">
            Friedrich482
          </Link>
        </span>
        . The code source is available on{" "}
        <span className="underline hover:text-black dark:hover:text-white">
          <Link
            href="https://github.com/Friedrich482/manga-reading-app"
            target="_blank"
          >
            Github
          </Link>
        </span>
        .
      </div>
    </footer>
  );
};
export default Footer;
