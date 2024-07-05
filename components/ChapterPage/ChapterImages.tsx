"use client";
import Image from "next/image";
import useStore from "@/hooks/store";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
const ChapterImages = ({ images }: { images: string[] }) => {
  const {
    width,
    isResizable,
    gapOption,
    setIsVisibleImagesArray,
    chapterPagesDisposition,
  } = useStore((state) => ({
    width: state.width,
    isResizable: state.isResizable,
    gapOption: state.gapOption,
    setIsVisibleImagesArray: state.setIsVisibleImagesArray,
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  const targetRefs = useRef<HTMLImageElement[]>([]);
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
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Initial check on component mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // cursor shape
  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const cursorY = e.clientY;
    const viewportHeight = window.outerHeight;

    if (cursorY < viewportHeight / 2) {
      window.scrollBy({
        top: (-viewportHeight * 2) / 3,
        behavior: "smooth",
      });
    } else {
      window.scrollBy({
        top: (viewportHeight * 2) / 3,
        behavior: "smooth",
      });
    }
  };
  const [cursorClass, setCursorClass] = useState("cursor-default");

  const defineCursorShape = (e: MouseEvent) => {
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const isUpperHalf = cursorY < viewportHeight / 2;
    const isLowerHalf = cursorY >= viewportHeight / 2;
    const isLeftSide = cursorX < viewportWidth / 2;
    const isRightSide = cursorX >= viewportWidth / 2;

    const isNearVerticalCenter = Math.abs(cursorX - viewportWidth / 2) <= 200;
    const isNearHorizontalCenter =
      Math.abs(cursorY - viewportHeight / 2) <= 200;

    if (chapterPagesDisposition === "Long Strip") {
      return isUpperHalf ? "cursor-up" : "cursor-down";
    } else {
      if (isUpperHalf && isNearVerticalCenter) {
        return "cursor-up";
      } else if (isLowerHalf && isNearVerticalCenter) {
        return "cursor-down";
      }

      if (isLeftSide && !isNearVerticalCenter) {
        return "cursor-left";
      } else if (isRightSide && !isNearVerticalCenter) {
        return "cursor-right";
      }
      // Default cursor, if none of the conditions match
      return "default-cursor";
    }
  };

  useEffect(() => {
    console.log(cursorClass);
  }, [cursorClass]);
  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const newCursorClass = defineCursorShape(e.nativeEvent);
    setCursorClass(newCursorClass);
  };
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
                  index !== 0 &&
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
