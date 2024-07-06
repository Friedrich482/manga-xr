"use client";
import useStore from "@/hooks/store";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

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
  const { currentPageIndex, setCurrentPageIndex } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
  }));
  return (
    chapterPagesMenuVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className="relative top-1 z-20 flex h-80 w-44 flex-none items-center justify-start overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
        >
          <ul className="flex h-full w-full flex-col items-center justify-start gap-[2px]">
            {images.map((image) => {
              const pageNumber = images.indexOf(image) + 1;
              return (
                <li
                  key={pageNumber}
                  className="flex w-full cursor-pointer items-center justify-start rounded-lg py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  <Link
                    href={`/manga/${altTitle}/${chapterSlug}/#page-${pageNumber}`}
                    onClick={() => {
                      setChapterPagesMenuVisibility(false);
                      setCurrentPageIndex(pageNumber - 1);
                    }}
                    className="w-full"
                  >
                    Page {pageNumber} / {images.length}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
};
export default ChapterPagesMenu;
