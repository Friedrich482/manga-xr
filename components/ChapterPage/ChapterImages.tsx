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
  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const cursorY = e.clientY;
    const viewportHeight = window.innerHeight;

    if (cursorY < viewportHeight / 2) {
      window.scrollBy({
        top: -viewportHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollBy({
        top: viewportHeight,
        behavior: "smooth",
      });
    }
  };
  const [cursorClass, setCursorClass] = useState("cursor-default");

  const defineCursorShape = (e: MouseEvent) => {
    const cursorY = e.clientY;
    const viewportHeight = window.innerHeight;

    if (cursorY < viewportHeight / 2) {
      return "cursor-up";
    } else {
      return "cursor-down";
    }
  };
  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const newCursorClass = defineCursorShape(e.nativeEvent);
    setCursorClass(newCursorClass);
  };
  return (
    <section
      className={`flex w-5/6 flex-col items-center justify-start self-center`}
      style={isResizable ? { width: width } : undefined}
    >
      <div
        className={tm(
          "flex w-full",
          chapterPagesDisposition === "Long Strip" && "flex-col",
        )}
        style={{ rowGap: gapOption.value }}
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
              alt={`page ${index}`}
              src={image}
              width={500}
              height={600}
              loading={index !== 0 && index !== 1 ? "lazy" : "eager"}
              //lazy loading for all images except for the first two
              className={tm("h-auto w-full cursor-pointer", cursorClass)}
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
