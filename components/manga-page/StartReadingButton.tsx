import { CiPlay1 } from "react-icons/ci";
import Link from "next/link";

const StartReadingButton = ({
  firstChapterSlug,
  lastChapterReadSlug,
}: {
  firstChapterSlug: string;
  lastChapterReadSlug: string | undefined;
}) => {
  return (
    <Link
      href={`/chapters/${lastChapterReadSlug || firstChapterSlug}`}
      className="flex items-center justify-center gap-x-1 place-self-start rounded-lg border border-neutral-700/80 px-4 py-2 text-black hover:border-neutral-950 hover:text-primary/95 dark:border-neutral-300/75 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-primary/95 max-options-menu-breakpoint-2:text-base options-menu-breakpoint-2:w-44 options-menu-breakpoint-2:justify-evenly options-menu-breakpoint-2:gap-x-2 options-menu-breakpoint-2:px-4"
    >
      <CiPlay1 />
      <span>{lastChapterReadSlug ? "Continue" : "Start Reading"}</span>
    </Link>
  );
};
export default StartReadingButton;
