import Link from "next/link";
import { CiPlay1 } from "react-icons/ci";

const StartReadingButton = ({ altTitle }: { altTitle: string }) => {
  return (
    <Link
      href={`/manga/${altTitle}/chapter-1`}
      className="hover:border-neutral-white flex items-center justify-center gap-x-1 place-self-start rounded-lg border border-neutral-800/50 px-4 py-2 text-black dark:border-neutral-300/75 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-orange-500/95 max-options-menu-breakpoint-2:text-base options-menu-breakpoint-2:w-44 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3 options-menu-breakpoint-2:px-4"
    >
      <CiPlay1 />
      <span>Start Reading</span>
    </Link>
  );
};
export default StartReadingButton;
