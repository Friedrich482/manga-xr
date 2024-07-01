"use client";
import useStore from "@/hooks/store";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";

const ProgressBar = ({ images }: { images: string[] }) => {
  const length = images.length;
  const { isVisibleImagesArray } = useStore();
  const currentPageIndex = isVisibleImagesArray.indexOf(true);
  return (
    <section className="group fixed bottom-2 flex h-6 w-[98%] items-end">
      <div className="h-1 w-full rounded-lg bg-transparent group-hover:h-3 group-hover:bg-neutral-500/50">
        <ul className="flex h-full w-full gap-x-[0.5px]">
          {images.map((image) => {
            const index = images.indexOf(image);
            return (
              <li
                key={image}
                title={`page ${index + 1}`}
                className={tm(
                  "h-full cursor-pointer border-x border-x-transparent bg-transparent",
                  index !== 0 &&
                    "border-l-transparent group-hover:border-l-neutral-500/50",
                  index !== length - 1 &&
                    "border-r-transparent group-hover:border-r-neutral-500/50",
                )}
                style={{ width: `${100 / length}%` }}
              >
                <div
                  className={tm(
                    "h-full rounded-lg border border-transparent hover:border-orange-500",
                    index <= currentPageIndex &&
                      "bg-orange-500/50 group-hover:bg-orange-500/70",
                  )}
                >
                  <Link
                    href={`#page-${index + 1}`}
                    className="flex h-full w-full"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default ProgressBar;
