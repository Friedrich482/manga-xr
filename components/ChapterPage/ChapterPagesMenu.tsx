"use client";
import useStore from "@/hooks/store";
import useHandleMenuPosition from "@/hooks/useHandleMenuPosition";
import useHandleOutsideClick from "@/hooks/useHandleOutsideClick";
import useToggleScroll from "@/hooks/useToggleScroll";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { twMerge as tm } from "tailwind-merge";
import DropDownMenu from "../lib/DropDownMenu";
import DropDownMenuLi from "../lib/DropDownMenuLi";
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
  const pathName = usePathname();
  const router = useRouter();

  const {
    currentPageIndex,
    setCurrentPageIndex,
    chapterPagesButtonPosition,
    chapterPagesDisposition,
  } = useStore((state) => ({
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
    chapterPagesButtonPosition: state.chapterPagesButtonPosition,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));

  const menuPosition = useHandleMenuPosition(chapterPagesButtonPosition);
  return (
    chapterPagesMenuVisibility && (
      <DropDownMenu menuPosition={menuPosition} ref={ref}>
        <ul className="w-full space-y-1">
          {images.map((image, index) => {
            const pageNumber = index + 1;
            return (
              <DropDownMenuLi
                key={image}
                isActive={pageNumber === currentPageIndex + 1}
              >
                {chapterPagesDisposition === "Long Strip" ? (
                  <Link
                    href={`/manga/${altTitle}/${chapterSlug}/#page-${pageNumber}`}
                    onClick={() => {
                      setChapterPagesMenuVisibility(false);
                    }}
                    className="flex w-full text-start"
                  >
                    Page {pageNumber}/{images.length}
                  </Link>
                ) : (
                  <button
                    className="text-start"
                    onClick={() => {
                      setCurrentPageIndex(pageNumber - 1);
                      router.push(pathName + `#page-${pageNumber}`);
                      setChapterPagesMenuVisibility(false);
                    }}
                  >
                    Page {pageNumber}/{images.length}
                  </button>
                )}
              </DropDownMenuLi>
            );
          })}
        </ul>
      </DropDownMenu>
    )
  );
};
export default ChapterPagesMenu;
