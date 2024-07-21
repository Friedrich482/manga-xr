"use client";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import useStore from "@/hooks/store";
import { usePathname, useRouter } from "next/navigation";

const ProgressBar = ({ images }: { images: string[] }) => {
  const {
    isVisibleImagesArray,
    progressBarVisibility,
    setCurrentPageIndex,
    chapterPagesDisposition,
    progressBarDirection,
  } = useStore((state) => ({
    isVisibleImagesArray: state.isVisibleImagesArray,
    progressBarVisibility: state.progressBarVisibility,
    setCurrentPageIndex: state.setCurrentPageIndex,
    chapterPagesDisposition: state.chapterPagesDisposition,
    progressBarDirection: state.progressBarDirection,
  }));

  const length = images.length;
  const currentPageIndexVisibility = isVisibleImagesArray.indexOf(true);
  const router = useRouter();
  const pathName = usePathname();
  return (
    <section
      className={tm(
        "group fixed flex items-end place-self-center",
        progressBarDirection === "Horizontal"
          ? "bottom-2 h-6 w-[97svw]"
          : "left-[94svw] top-[6rem] h-[85svh] w-[6svw]",
      )}
    >
      {progressBarVisibility && (
        <div
          className={tm(
            "rounded-lg bg-transparent group-hover:bg-neutral-500/50",
            progressBarDirection === "Horizontal"
              ? "h-1 w-full group-hover:h-3"
              : "flex h-full w-1 group-hover:w-3",
          )}
        >
          <ul
            className={tm(
              "flex h-full w-full",
              progressBarDirection === "Horizontal"
                ? "gap-x-[0.5px]"
                : "flex-col gap-y-[0.5px]",
            )}
          >
            {images.map((image) => {
              const index = images.indexOf(image);
              return (
                <li
                  key={image}
                  title={`page ${index + 1}`}
                  className={tm(
                    "cursor-pointer bg-transparent",
                    progressBarDirection === "Horizontal"
                      ? "h-full border-x border-x-transparent"
                      : "w-full border-y border-y-transparent",
                    index !== 0 && progressBarDirection === "Horizontal"
                      ? "border-l-transparent group-hover:border-l-neutral-500/50"
                      : "border-t-transparent group-hover:border-t-neutral-500/50",
                    index !== length - 1 &&
                      progressBarDirection === "Horizontal"
                      ? "border-r-transparent group-hover:border-r-neutral-500/50"
                      : "border-b-transparent group-hover:border-b-neutral-500/50",
                  )}
                  style={
                    progressBarDirection === "Horizontal"
                      ? { width: `${100 / length}%` }
                      : { height: `${100 / length}%` }
                  }
                >
                  {chapterPagesDisposition === "Long Strip" ? (
                    <Link
                      href={`#page-${index + 1}`}
                      className={tm(
                        "flex h-full w-full rounded-lg border border-transparent hover:border-orange-500",
                        index <= currentPageIndexVisibility &&
                          "bg-orange-500/50 group-hover:bg-orange-500/70",
                      )}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        router.push(pathName + `#page-${index + 1}`);
                        setCurrentPageIndex(index);
                      }}
                      className={tm(
                        "flex h-full w-full rounded-lg border border-transparent hover:border-orange-500",
                        index <= currentPageIndexVisibility &&
                          "bg-orange-500/50 group-hover:bg-orange-500/70",
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};
export default ProgressBar;
