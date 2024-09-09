"use client";
import React, { LegacyRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CursorClass } from "@/zod-schema/schema";
import Image from "next/image";
import handleImageClick from "@/utils/ChapterImagesFunctions/handleImageClick";
import handleMouseMove from "@/utils/ChapterImagesFunctions/handleMouseMove";
import { twMerge as tm } from "tailwind-merge";
import useArrayVisibilityInSinglePage from "@/hooks/ChapterImagesHooks/useArrayVisibilityInSinglePage";
import useArrowKeyNavigation from "@/hooks/ChapterImagesHooks/useArrowKeyNavigation";
import useHandleScroll from "@/hooks/ChapterImagesHooks/useHandleScroll";
import useInitializePageFromHistory from "@/hooks/ChapterImagesHooks/useInitializePageFromHistory";
import useInstantiatePreferences from "@/hooks/LocalStorage/useInstantiatePreferences";
import useLastPageRead from "@/hooks/History/useLastPageRead";
import usePageFromUrl from "@/hooks/ChapterImagesHooks/usePageFromUrl";
import useScrollToCurrentPageWhenSwitchingBackToLongStrip from "@/hooks/ChapterImagesHooks/useScrollToCurrentPageWhenSwitchingBackToLongStrip";
import useStore from "@/hooks/store";
import useSynchronizeLocalStorage from "@/hooks/LocalStorage/useSynchronizeLocalStorage";
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

  const [cursorClass, setCursorClass] = useState<CursorClass>("cursor-default");
  const router = useRouter();
  const pathName = usePathname();

  const isInitialized = useInstantiatePreferences();
  useInitializePageFromHistory(isInitialized);
  useSynchronizeLocalStorage(isInitialized);
  useLastPageRead(isInitialized);
  const targetRefs = useHandleScroll();
  useArrowKeyNavigation(targetRefs, images);

  useArrayVisibilityInSinglePage(targetRefs);

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
