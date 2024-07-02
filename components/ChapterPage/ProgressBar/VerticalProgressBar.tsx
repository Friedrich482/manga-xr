import useStore from "@/hooks/store";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import ToggleProgressBarButton from "./ToggleProgressBarButton";

const VerticalProgressBar = ({ images }: { images: string[] }) => {
  const { isVisibleImagesArray, progressBarVisibility } = useStore((state) => ({
    isVisibleImagesArray: state.isVisibleImagesArray,
    progressBarVisibility: state.progressBarVisibility,
  }));

  const length = images.length;
  const currentPageIndex = isVisibleImagesArray.indexOf(true);

  return (
    <section className="group fixed right-6 top-[4.1rem] flex h-[85vh] w-6 flex-col-reverse items-end">
      {progressBarVisibility && (
        <div className="flex h-full w-1 flex-shrink-0 rounded-lg bg-transparent group-hover:w-3 group-hover:bg-neutral-500/50">
          <ul className="flex h-full w-full flex-col gap-y-[0.5px]">
            {images.map((image) => {
              const index = images.indexOf(image);
              return (
                <li
                  key={image}
                  title={`page ${index + 1}`}
                  className={tm(
                    "w-full cursor-pointer border-y border-y-transparent bg-transparent",
                    index !== 0 &&
                      "border-t-transparent group-hover:border-t-neutral-500/50",
                    index !== length - 1 &&
                      "border-b-transparent group-hover:border-b-neutral-500/50",
                  )}
                  style={{ height: `${100 / length}%` }}
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
      <ToggleProgressBarButton direction="Vertical" />
    </section>
  );
};
export default VerticalProgressBar;
