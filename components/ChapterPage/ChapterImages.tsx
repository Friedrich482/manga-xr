"use client";
import Image from "next/image";
import useStore from "@/hooks/store";
import React, { LegacyRef, useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useHandleScroll from "@/hooks/ChapterImagesHooks/useHandleScroll";
import handleMouseMove from "@/utils/ChapterImagesFunctions/handleMouseMove";
import handleImageClick from "@/utils/ChapterImagesFunctions/handleImageClick";
import useSynchronizeLocalStorage from "@/hooks/LocalStorage/useSynchronizeLocalStorage";
import useUpdatingUrlWhenScrollingInLongStripMode from "@/hooks/ChapterImagesHooks/useUpdatingUrlWhenScrollingInLongStripMode";
import useScrollToCurrentPageWhenSwitchingBackToLongStrip from "@/hooks/ChapterImagesHooks/useScrollToCurrentPageWhenSwitchingBackToLongStrip";
import usePageFromUrl from "@/hooks/ChapterImagesHooks/usePageFromUrl";
import useInstantiateFromLocalStorage from "@/hooks/LocalStorage/useInstantiateFromLocalStorage";
import useArrowKeyNavigation from "@/hooks/ChapterImagesHooks/useArrowKeyNavigation";
const ChapterImages = ({ images }: { images: string[] }) => {
  const {
    width,
    isResizable,
    gapOption,
    chapterPagesDisposition,
    currentPageIndex,
    setCurrentPageIndex,
    setIsVisibleImagesArray,
  } = useStore((state) => ({
    width: state.width,
    isResizable: state.isResizable,
    gapOption: state.gapOption,
    chapterPagesDisposition: state.chapterPagesDisposition,
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
    setIsVisibleImagesArray: state.setIsVisibleImagesArray,
  }));

  const [cursorClass, setCursorClass] = useState("cursor-default");
  const router = useRouter();
  const pathName = usePathname();

  // Initializations

  useEffect(() => {
    // Always initialize it to 0, because this state can be conserved between chapters
    router.push(`${pathName}#page-1`, { scroll: false });
    setCurrentPageIndex(0);
  }, [pathName]);

  const isInitialized = useInstantiateFromLocalStorage();
  useSynchronizeLocalStorage(isInitialized);

  const targetRefs = useHandleScroll();
  useArrowKeyNavigation(targetRefs, images);

  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      const initialVisibility = targetRefs.current.map(
        (_, index) => index === 0,
      );
      setIsVisibleImagesArray(initialVisibility);
      setCurrentPageIndex(0); // Always set to the first page index
    }
  }, [pathName, setIsVisibleImagesArray, setCurrentPageIndex]);

  useUpdatingUrlWhenScrollingInLongStripMode();

  useScrollToCurrentPageWhenSwitchingBackToLongStrip();

  // we should also be able to read the page number from the url if it is manually changed by the user
  usePageFromUrl(images);

  return (
    <section
      className="flex w-5/6 flex-col items-center justify-start self-center"
      style={isResizable ? { width: width } : undefined}
    >
      <div
        className={tm(
          "flex w-full",
          chapterPagesDisposition === "Long Strip" && "flex-col",
          chapterPagesDisposition === "Single Page" && "",
        )}
        style={
          chapterPagesDisposition === "Long Strip"
            ? { rowGap: gapOption.value }
            : {}
        }
      >
        {images.map((image, index) => {
          return (
            <Image
              ref={
                ((el: HTMLImageElement) =>
                  (targetRefs.current[index] = el)) as unknown as
                  | LegacyRef<HTMLImageElement | null>
                  | undefined
              }
              onClick={() => {
                handleImageClick(
                  cursorClass,
                  router,
                  images,
                  targetRefs,
                  pathName,
                );
              }}
              id={`page-${index + 1}`}
              alt={`page ${index + 1}`}
              src={image}
              width={500}
              height={600}
              loading={index !== 0 && index !== 1 ? "lazy" : "eager"}
              //lazy loading for all images except for the first two
              priority={index !== 0 && index !== 1 ? false : true}
              // same for the priority
              className={tm(
                "h-auto w-full cursor-pointer",
                cursorClass,
                chapterPagesDisposition === "Single Page" &&
                  "relative flex-shrink-0",
                chapterPagesDisposition === "Single Page" &&
                  index !== currentPageIndex &&
                  "hidden",
              )}
              key={image}
              onMouseMove={(e) => {
                handleMouseMove(e, images, setCursorClass);
              }}
            />
          );
        })}
      </div>
    </section>
  );
};
export default ChapterImages;
