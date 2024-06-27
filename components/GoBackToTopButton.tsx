"use client";
import { useEffect, useState } from "react";
import { GoChevronUp } from "react-icons/go";
const GoBackToTopButton = () => {
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
  return isVisible ? (
    <button
      onClick={jumpToTop}
      className="absolute right-12 z-50 flex size-16 items-center justify-center rounded-3xl bg-black text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-300"
    >
      <GoChevronUp className="size-12" />
    </button>
  ) : (
    <></>
  );
};
export default GoBackToTopButton;
