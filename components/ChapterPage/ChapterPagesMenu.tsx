"use client";
import useStore from "@/hooks/store";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
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
  const { currentPageIndex, setCurrentPageIndex, chapterPagesButtonPosition } =
    useStore((state) => ({
      currentPageIndex: state.currentPageIndex,
      setCurrentPageIndex: state.setCurrentPageIndex,
      chapterPagesButtonPosition: state.chapterPagesButtonPosition,
    }));

  // we should also be able to read the page number from the url
  const router = useRouter();
  const handleHashChange = () => {
    const pageIdMatch = window.location.hash.match(/#page-(\d+)/);
    if (pageIdMatch && pageIdMatch[1]) {
      const pageId = parseInt(pageIdMatch[1], 10);
      if (pageId > images.length || pageId <= 0) {
        router.replace("/404");
      }
      setCurrentPageIndex(pageId - 1);
    }
  };

  useEffect(() => {
    // Subscribe to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup subscription on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [currentPageIndex]);

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
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
export default ChapterPagesMenu;
