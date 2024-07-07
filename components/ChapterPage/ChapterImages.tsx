"use client";
import Image from "next/image";
import useStore from "@/hooks/store";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import defineCursorShape from "@/utils/defineCursorShape";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const ChapterImages = ({ images }: { images: string[] }) => {
  const {
    width,
    isResizable,
    gapOption,
    setIsVisibleImagesArray,
    chapterPagesDisposition,
    currentPageIndex,
    setCurrentPageIndex,
    readingDirection,
    setReadingDirection,
  } = useStore((state) => ({
    width: state.width,
    isResizable: state.isResizable,
    gapOption: state.gapOption,
    setIsVisibleImagesArray: state.setIsVisibleImagesArray,
    chapterPagesDisposition: state.chapterPagesDisposition,
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
    readingDirection: state.readingDirection,
    setReadingDirection: state.setReadingDirection,
  }));

  const targetRefs = useRef<HTMLImageElement[]>([]);
  const [cursorClass, setCursorClass] = useState("cursor-default");
  const router = useRouter();
  const pathName = usePathname();

  const handleScroll = () => {
    const newVisibilityState = targetRefs.current.map((img) => {
      const margin = window.innerHeight / 2;
      // this margin ensure that if the user navigates at a page, the progressbar element for that page will be activated
      const rect = img?.getBoundingClientRect();
      const isVerticallyVisible =
        rect !== undefined &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) +
            margin &&
        rect.bottom - margin >= 0;
      return isVerticallyVisible;
    });
    setIsVisibleImagesArray(newVisibilityState);
    setCurrentPageIndex(newVisibilityState.indexOf(true));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Initial check on component mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // use effect to make sure that the element of the progress bar is activated once we are on a new page
  // exceptionally when it is a single page disposition
  useEffect(() => {
    handleScroll();
  }, [currentPageIndex]);

  useEffect(() => {
    if (chapterPagesDisposition === "Long Strip") {
      router.push(`${pathName}#page-${currentPageIndex + 1}`, {
        scroll: false,
      });
    }
  }, [currentPageIndex]);

  // cursor-shape
  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const newCursorClass = defineCursorShape(
      e.nativeEvent,
      chapterPagesDisposition,
      currentPageIndex,
      images,
      readingDirection,
    );
    setCursorClass(newCursorClass);
  };

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const viewportHeight = window.outerHeight;
    const isLongStrip = chapterPagesDisposition === "Long Strip";
    const isSinglePage = chapterPagesDisposition === "Single Page";

    const scrollByAmount = (viewportHeight * 2) / 3;

    if (isLongStrip) {
      handleLongStripScroll(scrollByAmount);
    } else if (isSinglePage) {
      handleSinglePageNavigation();
    }
  };

  const handleLongStripScroll = (scrollByAmount: number) => {
    const scrollDirection = cursorClass === "cursor-up" ? -1 : 1;
    window.scrollBy({
      top: scrollByAmount * scrollDirection,
      behavior: "smooth",
    });
  };
  const handleSinglePageNavigation = () => {
    const newPageIndex = (() => {
      if (readingDirection === "From left to right") {
        if (
          cursorClass === "cursor-right" &&
          currentPageIndex < images.length - 1
        ) {
          return currentPageIndex + 1;
        }
        if (cursorClass === "cursor-left" && currentPageIndex > 0) {
          return currentPageIndex - 1;
        }
      } else {
        if (cursorClass === "cursor-right" && currentPageIndex > 0) {
          return currentPageIndex - 1;
        }
        if (
          cursorClass === "cursor-left" &&
          currentPageIndex < images.length - 1
        ) {
          return currentPageIndex + 1;
        }
      }
      return currentPageIndex;
    })();
    if (newPageIndex !== currentPageIndex) {
      setCurrentPageIndex(newPageIndex);
      window.scrollTo({
        top: targetRefs?.current[currentPageIndex].offsetTop - 70,
        behavior: "smooth",
      });
      router.push(`${pathName}#page-${newPageIndex + 1}`, { scroll: false });
    }
  };
  useEffect(() => {
    router.push(`${pathName}#page-1`, { scroll: false });
  }, []);
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
              onClick={(e) => {
                handleImageClick(e);
              }}
              id={`page-${index + 1}`}
              alt={`page ${index + 1}`}
              src={image}
              width={500}
              height={600}
              loading={index !== 0 && index !== 1 ? "lazy" : "eager"}
              //lazy loading for all images except for the first two
              className={tm(
                "h-auto w-full cursor-pointer",
                cursorClass,
                chapterPagesDisposition === "Single Page" &&
                  "relative flex-shrink-0",
                chapterPagesDisposition === "Single Page" &&
                  index !== currentPageIndex &&
                  "hidden",
              )}
              key={`${index}`}
              onMouseMove={handleMouseMove}
            />
          );
        })}
      </div>
    </section>
  );
};
export default ChapterImages;
