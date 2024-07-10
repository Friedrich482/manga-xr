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
const ChapterImages = ({ images }: { images: string[] }) => {
  const {
    width,
    isResizable,
    gapOption,
    chapterPagesDisposition,
    currentPageIndex,
  } = useStore((state) => ({
    width: state.width,
    isResizable: state.isResizable,
    gapOption: state.gapOption,
    chapterPagesDisposition: state.chapterPagesDisposition,
    currentPageIndex: state.currentPageIndex,
  }));

  const [cursorClass, setCursorClass] = useState("cursor-default");
  const router = useRouter();
  const pathName = usePathname();

  const targetRefs = useHandleScroll();
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
                handleImageClick(
                  e,
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
