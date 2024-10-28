import { usePathname, useRouter } from "next/navigation";
import arrowKeyNavigation from "@/utils/chapter-images-functions/arrowKeyNavigation";
import { useEffect } from "react";
import useStore from "../zustand/store";

const useArrowKeyNavigation = (
  images: string[],
) => {
  const { chapterPagesDisposition } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  const router = useRouter();
  const pathName = usePathname();

  const handleKeyDown = (e: KeyboardEvent) => {
    arrowKeyNavigation(e, images, router, pathName);
  };

  useEffect(() => {
    if (chapterPagesDisposition === "Single Page") {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [chapterPagesDisposition]);
};

export default useArrowKeyNavigation;
