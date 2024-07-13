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
import useLocalStorage from "@/hooks/LocalStorage/useLocalStorage";
const ChapterImages = ({ images }: { images: string[] }) => {
  const {
    width,
    isResizable,
    gapOption,
    chapterPagesDisposition,
    currentPageIndex,
    setCurrentPageIndex,
  } = useStore((state) => ({
    width: state.width,
    isResizable: state.isResizable,
    gapOption: state.gapOption,
    chapterPagesDisposition: state.chapterPagesDisposition,
    currentPageIndex: state.currentPageIndex,
    setCurrentPageIndex: state.setCurrentPageIndex,
  }));
  const [cursorClass, setCursorClass] = useState("cursor-default");
  const router = useRouter();
  const pathName = usePathname();

  const targetRefs = useHandleScroll();
  useEffect(() => {
    // Always initialize it to 0, because this state cans be conserved between chapters
    setCurrentPageIndex(0);
  }, []);

  // use it once
  useLocalStorage();
  useEffect(() => {
    router.push(`${pathName}#page-1`, { scroll: false });
  }, []);
  useEffect(() => {
    if (chapterPagesDisposition === "Long Strip") {
      router.push(`${pathName}#page-${currentPageIndex + 1}`, {
        scroll: false,
      });
    }
  }, [currentPageIndex]);
  useEffect(() => {
    if (chapterPagesDisposition === "Long Strip") {
      router.push(`${pathName}#page-${currentPageIndex + 1}`, {
        scroll: true,
      });
    }
  }, [chapterPagesDisposition]);
  // we should also be able to read the page number from the url
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
