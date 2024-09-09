"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GoChevronUp } from "react-icons/go";
import useStore from "@/hooks/zustand/store";
const GoBackToTopButton = () => {
  const { chapterPagesDisposition } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  });
  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const router = useRouter();
  const pathName = usePathname();
  return (
    isVisible && (
      <button
        onClick={() => {
          jumpToTop();
          if (
            pathName.includes("chapter") &&
            chapterPagesDisposition === "Long Strip"
          ) {
            router.push(pathName, { scroll: false });
            // on a chapter page, it removes if necessary, the #page${pageNumber} of the url due to click on the progress bar.
          }
        }}
        className="absolute right-12 z-50 flex size-16 items-center justify-center rounded-3xl bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-300 max-very-small-nav:size-8 max-very-small-nav:rounded-xl max-chapters-breakpoint:right-6"
      >
        <GoChevronUp className="size-3/4" />
      </button>
    )
  );
};
export default GoBackToTopButton;
