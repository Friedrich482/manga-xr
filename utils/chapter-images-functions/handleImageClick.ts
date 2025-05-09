import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CursorClass } from "@/zod-schema/schema";
import handleLongStripScroll from "./handleLongStripScroll";
import handleSinglePageNavigation from "./handleSinglePageNavigation";
import useStore from "@/hooks/zustand/store";

const handleImageClick = (
  cursorClass: CursorClass,
  router: AppRouterInstance,
  images: string[],
  pathName: string,
) => {
  const { chapterPagesDisposition } = useStore.getState();
  const viewportHeight = window.outerHeight;
  const isLongStrip = chapterPagesDisposition === "Long Strip";

  const scrollByAmount = (viewportHeight * 2) / 3;

  if (isLongStrip) {
    handleLongStripScroll(scrollByAmount, cursorClass);
  } else {
    handleSinglePageNavigation(cursorClass, images, router, pathName);
  }
};

export default handleImageClick;
