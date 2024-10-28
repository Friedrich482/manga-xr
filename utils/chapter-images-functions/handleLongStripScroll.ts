import { CursorClass } from "@/zod-schema/schema";

const handleLongStripScroll = (
  scrollByAmount: number,
  cursorClass: CursorClass,
) => {
  const scrollDirection = cursorClass === "cursor-up" ? -1 : 1;
  window.scrollBy({
    top: scrollByAmount * scrollDirection,
    behavior: "smooth",
  });
};

export default handleLongStripScroll;
