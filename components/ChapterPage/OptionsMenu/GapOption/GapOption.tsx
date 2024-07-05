import { twMerge as tm } from "tailwind-merge";
import GapOptionDropDown from "./GapOptionDropDown";
import useStore from "@/hooks/store";

const GapOption = () => {
  const { chapterPagesDisposition } = useStore((state) => ({
    chapterPagesDisposition: state.chapterPagesDisposition,
  }));
  return (
    <li
      className={tm(
        "mt-4 flex w-full gap-x-4",
        chapterPagesDisposition === "Single Page" &&
          "cursor-not-allowed text-neutral-500/50",
      )}
    >
      <label
        className={tm(
          "transition duration-300 ease-in-out",
          chapterPagesDisposition === "Single Page" &&
            "cursor-not-allowed text-neutral-500/50",
        )}
      >
        Page Gap:
      </label>
      <GapOptionDropDown />
    </li>
  );
};
export default GapOption;
