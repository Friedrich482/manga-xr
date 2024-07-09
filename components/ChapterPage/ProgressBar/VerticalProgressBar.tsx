import useStore from "@/hooks/store";
import Link from "next/link";
import { twMerge as tm } from "tailwind-merge";
import ToggleProgressBarButton from "./ToggleProgressBarButton";
import { usePathname, useRouter } from "next/navigation";

const VerticalProgressBar = ({ images }: { images: string[] }) => {
  const {
    isVisibleImagesArray,
    progressBarVisibility,
    setCurrentPageIndex,
    chapterPagesDisposition,
  } = useStore((state) => ({
    isVisibleImagesArray: state.isVisibleImagesArray,
    progressBarVisibility: state.progressBarVisibility,
    setCurrentPageIndex: state.setCurrentPageIndex,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));

  const length = images.length;
  const currentPageIndexVisibility = isVisibleImagesArray.indexOf(true);
  const router = useRouter();
  const pathName = usePathname();

  return (
    <section className="group fixed top-[4.1rem] flex h-[85vh] w-[6svw] flex-col-reverse items-end self-end">
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
      <ToggleProgressBarButton direction="Vertical" />
    </section>
  );
};
export default VerticalProgressBar;
