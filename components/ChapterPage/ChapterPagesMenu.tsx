"use client";
import useStore from "@/hooks/store";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { twMerge as tm } from "tailwind-merge";
const ChapterPagesMenu = ({
  chapterPagesMenuVisibility,
  setChapterPagesMenuVisibility,
  images,
}: {
  chapterPagesMenuVisibility: boolean;
  setChapterPagesMenuVisibility: Dispatch<SetStateAction<boolean>>;
  images: string[];
}) => {
  const ref = useHandleOutsideClick(
    chapterPagesMenuVisibility,
    setChapterPagesMenuVisibility,
  );
  useToggleScroll(chapterPagesMenuVisibility);
  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const {
    setCurrentPageIndex,
    chapterPagesButtonPosition,
    chapterPagesDisposition,
  } = useStore((state) => ({
    setCurrentPageIndex: state.setCurrentPageIndex,
    chapterPagesButtonPosition: state.chapterPagesButtonPosition,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  const pathName = usePathname();
  const router = useRouter();

  const menuPosition = useHandleMenuPosition(chapterPagesButtonPosition);

  return (
    chapterPagesMenuVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className={tm(
            "relative z-20 flex h-80 min-w-44 flex-col overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black",
            menuPosition === "bottom of the button"
              ? "top-1"
              : "bottom-[22.5rem]",
          )}
        >
          {images.map((image) => {
            const pageNumber = images.indexOf(image) + 1;
            return (
              <div
                key={image}
                className="flex w-full cursor-pointer items-center justify-start rounded-lg py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
              >
                {chapterPagesDisposition === "Long Strip" ? (
                  <Link
                    href={`/manga/${altTitle}/${chapterSlug}/#page-${pageNumber}`}
                    onClick={() => {
                      setChapterPagesMenuVisibility(false);
                    }}
                    className="w-full"
                  >
                    Page {pageNumber} / {images.length}
                  </Link>
                ) : (
                  <button
                    className="w-full"
                    onClick={() => {
                      setCurrentPageIndex(pageNumber - 1);
                      router.push(pathName + `#page-${pageNumber}`);
                      setChapterPagesMenuVisibility(false);
                    }}
                  >
                    Page {pageNumber} / {images.length}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
export default ChapterPagesMenu;
