"use client";
import Image from "next/image";
import useStore from "@/hooks/store";
import React, { LegacyRef, useEffect, useRef } from "react";
import { twMerge as tm } from "tailwind-merge";
const ChapterImages = ({ images }: { images: string[] }) => {
  const { width, isResizable, gapOption, setIsVisibleImagesArray } = useStore();
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
  return (
    <section
      className={`flex w-5/6 flex-col items-center justify-start self-center`}
      style={isResizable ? { width: width } : {}}
    >
      <div className="flex w-full flex-col" style={{ rowGap: gapOption.value }}>
        {images.map((image, index) => {
          return (
            <Image
              ref={
                ((el: HTMLImageElement) =>
                  (targetRefs.current[index] = el)) as unknown as
                  | LegacyRef<HTMLImageElement | null>
                  | undefined
              }
              id={`page-${index + 1}`}
              alt={`page ${index}`}
              src={image}
              width={500}
              height={600}
              loading={index !== 0 && index !== 1 ? "lazy" : "eager"}
              //lazy loading for all images except for the first two
              className={tm("h-auto w-full")}
              key={`${index}`}
            />
          );
        })}
      </div>
    </section>
  );
};
export default ChapterImages;
