import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import useStore from "@/hooks/store";
import ToggleProgressBarButton from "./ToggleProgressBarButton";

const HorizontalProgressBar = ({ images }: { images: string[] }) => {
  const { isVisibleImagesArray, progressBarVisibility, setCurrentPageIndex } =
    useStore((state) => ({
      isVisibleImagesArray: state.isVisibleImagesArray,
      progressBarVisibility: state.progressBarVisibility,
      setCurrentPageIndex: state.setCurrentPageIndex,
    }));

  const length = images.length;
  const currentPageIndexVisibility = isVisibleImagesArray.indexOf(true);

  return (
    <section className="group fixed bottom-2 flex h-6 w-[97vw] flex-row-reverse items-end">
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
                      index <= currentPageIndexVisibility &&
                        "bg-orange-500/50 group-hover:bg-orange-500/70",
                    )}
                  >
                    <Link
                      href={`#page-${index + 1}`}
                      onClick={() => {
                        setCurrentPageIndex(index);
                      }}
                      className="flex h-full w-full"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <ToggleProgressBarButton direction="Horizontal" />
    </section>
  );
};
export default HorizontalProgressBar;
