import { Children } from "@/types/layout-types";
import Link from "next/link";

const ListLayout = ({ children }: { children: Children }) => {
  const alphabet: string[] = [..."#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  return (
    <>
      <section className="mt-20 w-10/12 place-self-center">
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {alphabet.map((letter) => (
            <Link key={letter} href={`/list/${letter.toLowerCase()}`}>
              <li className="size-8 rounded-full bg-orange-400 bg-opacity-75 text-center">
                <span className="relative top-1 text-base font-extrabold">
                  {letter}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </section>
      {children}
    </>
  );
};
export default ListLayout;
