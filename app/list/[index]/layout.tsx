import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

export const alphabet: string[] = [..."#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const ListTemplate = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { index: string };
}) => {
  const { index: characterFromUrl } = params;
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="mt-20 w-10/12 place-self-center">
        <ul className="flex w-full flex-wrap items-center justify-center gap-3">
          {alphabet.map((character) => (
            <li
              key={character}
              className={tm(
                "size-8 cursor-pointer rounded-full bg-orange-400 bg-opacity-75 text-center hover:text-black",
                (characterFromUrl === character.toLowerCase() ||
                  (character === "#" && characterFromUrl === "numbers")) &&
                  "animate-bounce bg-violet-600 shadow-xl",
              )}
            >
              <Link
                href={
                  character !== "#"
                    ? `/list/${character.toLowerCase()}`
                    : "numbers"
                }
              >
                <span className="relative top-1 text-base font-extrabold">
                  {character}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {children}
    </main>
  );
};
export default ListTemplate;
