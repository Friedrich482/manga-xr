"use client";
import useStore from "@/hooks/store";
import Link from "next/link";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { twMerge as tm } from "tailwind-merge";

const ProgressBar = ({ images }: { images: string[] }) => {
  const length = images.length;
  const {
    isVisibleImagesArray,
    setProgressBarVisibility,
    progressBarVisibility,
  } = useStore((state) => ({
    isVisibleImagesArray: state.isVisibleImagesArray,
    progressBarVisibility: state.progressBarVisibility,
    setProgressBarVisibility: state.setProgressBarVisibility,
  }));
  const currentPageIndex = isVisibleImagesArray.indexOf(true);
  return (
    <section className="group fixed bottom-2 flex h-6 w-[98%] flex-row-reverse items-end">
      {progressBarVisibility && (
        <div className="h-1 w-full flex-shrink-0 rounded-lg bg-transparent group-hover:h-3 group-hover:bg-neutral-500/50">
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
      )}
      <button
        onClick={() => {
          setProgressBarVisibility(progressBarVisibility);
        }}
        className="absolute bottom-8 left-4 place-self-start text-neutral-500/80 hover:text-neutral-300"
        aria-label={`${progressBarVisibility ? "Hide" : "Show"} the progress bar`}
        title={`${progressBarVisibility ? "Hide" : "Show"} the progress bar`}
      >
        {progressBarVisibility ? (
          <IoIosCloseCircleOutline className="size-6" />
        ) : (
          <SlOptions className="size-6" />
        )}
      </button>
    </section>
  );
};
export default ProgressBar;
