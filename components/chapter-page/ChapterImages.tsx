"use client";
import React, { Ref, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CursorClass } from "@/zod-schema/schema";
import Image from "next/image";
import handleImageClick from "@/utils/chapter-images-functions/handleImageClick";
import handleMouseMove from "@/utils/chapter-images-functions/handleMouseMove";
import { twMerge as tm } from "tailwind-merge";
import useArrayVisibilityInSinglePage from "@/hooks/chapter-images-hooks/useArrayVisibilityInSinglePage";
import useArrowKeyNavigation from "@/hooks/chapter-images-hooks/useArrowKeyNavigation";
import useHandleScroll from "@/hooks/chapter-images-hooks/useHandleScroll";
import useInitializePageFromHistory from "@/hooks/chapter-images-hooks/useInitializePageFromHistory";
import useInstantiatePreferences from "@/hooks/localStorage/useInstantiatePreferences";
import useIsSmallScreen from "@/hooks/chapter-images-hooks/useIsSmallScreen";
import useLastPageRead from "@/hooks/history/useLastPageRead";
import usePageFromUrl from "@/hooks/chapter-images-hooks/usePageFromUrl";
import useScrollToCurrentPageWhenSwitchingBackToLongStrip from "@/hooks/chapter-images-hooks/useScrollToCurrentPageWhenSwitchingBackToLongStrip";
import useStore from "@/hooks/zustand/store";
import useSynchronizeLocalStorage from "@/hooks/localStorage/useSynchronizeLocalStorage";

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

  const isSmallScreen = useIsSmallScreen();
  const isInitialized = useInstantiatePreferences();
  useInitializePageFromHistory(isInitialized);
  useSynchronizeLocalStorage(isInitialized);
  useLastPageRead(isInitialized);
  const targetRefs = useHandleScroll();
  useArrowKeyNavigation(images);

  useArrayVisibilityInSinglePage(targetRefs);

  useScrollToCurrentPageWhenSwitchingBackToLongStrip();

  // we should also be able to read the page number from the url if it is manually changed by the user
  usePageFromUrl(images);

  return (
    <section
      className={tm(
        "flex w-5/6 flex-col items-center justify-start self-center",
        isSmallScreen && "w-[108%]",
      )}
      style={isResizable ? { width } : undefined}
    >
      <div
        className={tm(
          "flex w-full",
          chapterPagesDisposition === "Long Strip" && "flex-col",
        )}
        style={
          chapterPagesDisposition === "Long Strip"
            ? { rowGap: gapOption.value }
            : undefined
        }
      >
        {images.map((image, index) => (
          <Image
            key={`page-${index + 1}`}
            ref={
              ((el: HTMLImageElement) =>
                (targetRefs.current[index] = el)) as unknown as
                | Ref<HTMLImageElement | null>
                | undefined
            }
            onClick={() => {
              handleImageClick(cursorClass, router, images, pathName);
            }}
            id={`page-${index + 1}`}
            alt={`page ${index + 1}`}
            src={image}
            width={500}
            height={600}
            //lazy loading for all images except for the first two
            loading={index !== 0 && index !== 1 ? "lazy" : "eager"}
            // same for the priority
            priority={index !== 0 && index !== 1 ? false : true}
            className={tm(
              "h-auto w-full cursor-pointer",
              cursorClass,
              chapterPagesDisposition === "Single Page" && "relative shrink-0",
              chapterPagesDisposition === "Single Page" &&
                index !== currentPageIndex &&
                "hidden",
            )}
            onMouseMove={(e) => {
              handleMouseMove(e, images, setCursorClass);
            }}
          />
        ))}
      </div>
    </section>
  );
};
export default ChapterImages;
