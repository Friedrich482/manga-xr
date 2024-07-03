"use client";
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
  return (
    chapterPagesMenuVisibility && (
      <div className="h-0">
        <div
          ref={ref}
          className="relative top-1 z-20 flex h-80 w-44 flex-none items-center justify-start overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white px-2 py-2 dark:bg-default-black"
        >
          <ul className="flex h-full w-full flex-col items-center justify-start gap-[2px]">
            {images.map((image) => {
              const imageNumber = images.indexOf(image) + 1;

              return (
                <li
                  key={imageNumber}
                  className="flex w-full cursor-pointer items-center justify-start rounded-lg py-1 pl-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                >
                  <Link
                    href={`/manga/${altTitle}/${chapterSlug}/#page-${imageNumber}`}
                    onClick={() => {
                      setChapterPagesMenuVisibility(false);
                    }}
                    className="w-full"
                  >
                    Page {imageNumber} / {images.length}
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
