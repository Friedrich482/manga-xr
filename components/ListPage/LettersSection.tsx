import Link from "next/link";
import { alphabet } from "@/lib/constants";
import { twMerge as tm } from "tailwind-merge";

const LettersSection = ({ characterFromUrl }: { characterFromUrl: string }) => {
  return (
    <ol className="flex w-5/6 flex-wrap items-center justify-center gap-3 pb-5">
      {alphabet.map((character) => (
        <li
          key={character}
          className={tm(
            "size-8 cursor-pointer rounded-full bg-primary bg-opacity-75 text-center hover:text-black",
            (characterFromUrl === character.toLowerCase() ||
              (character === "#" && characterFromUrl === "numbers")) &&
              "animate-bounce bg-violet-600 shadow-xl",
          )}
        >
          <Link
            href={
              character !== "#" ? `/list/${character.toLowerCase()}` : "numbers"
            }
            className="block size-full"
          >
            <span className="relative top-1 text-base font-extrabold">
              {character}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
export default LettersSection;
