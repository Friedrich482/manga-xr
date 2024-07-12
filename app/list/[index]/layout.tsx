import Link from "next/link";

import { headers } from "next/headers";
import { twMerge as tm } from "tailwind-merge";

const ListTemplate = ({ children }: { children: React.ReactNode }) => {
  const headersList = headers();
  // read the custom x-url header
  const headerUrl = headersList.get("x-url") || "";
  const characterFromUrl = headerUrl.substring(
    headerUrl.lastIndexOf("/") + 1,
    headerUrl.length,
  );
  const alphabet: string[] = [..."#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="mt-20 w-10/12 place-self-center">
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {alphabet.map((character) => (
            <Link
              key={character}
              href={
                character !== "#"
                  ? `/list/${character.toLowerCase()}`
                  : "numbers"
              }
              className="group"
            >
              <li
                className={tm(
                  "size-8 rounded-full bg-orange-400 bg-opacity-75 text-center group-hover:text-black",
                  (characterFromUrl === character.toLowerCase() ||
                    (character === "#" && characterFromUrl === "numbers")) &&
                    "animate-bounce bg-violet-600 shadow-xl",
                )}
              >
                <span className="relative top-1 text-base font-extrabold">
                  {character}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </section>
      {children}
    </main>
  );
};
export default ListTemplate;
