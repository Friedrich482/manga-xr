import useStore from "@/hooks/store";
import { twMerge as tm } from "tailwind-merge";

const ReadingDirectionOption = () => {
  const { chapterPagesDisposition, readingDirection, setReadingDirection } =
    useStore((state) => ({
      chapterPagesDisposition: state.chapterPagesDisposition,
      readingDirection: state.readingDirection,
      setReadingDirection: state.setReadingDirection,
    }));
  return (
    <li
      className={tm(
        "mb-5 mt-6 flex w-full flex-wrap items-center gap-4",
        chapterPagesDisposition === "Long Strip" &&
          "cursor-not-allowed text-neutral-500/50",
      )}
    >
      <label
        htmlFor="readingDirection"
        className={tm(
          chapterPagesDisposition === "Long Strip" && "cursor-not-allowed",
        )}
      >
        Reading Direction:
      </label>
      <div className="mt-1 flex gap-4 max-chapters-breakpoint:flex-col">
        <div className="flex gap-2">
          <input
            type="radio"
            checked={readingDirection === "From left to right"}
            id="fromLeftToRight"
            name="reading-direction"
            value="From left to right"
            className={tm(
              "size-4 self-center accent-orange-500",
              chapterPagesDisposition === "Long Strip" && "cursor-not-allowed",
            )}
            onChange={() => {
              setReadingDirection("From left to right");
            }}
            disabled={chapterPagesDisposition === "Long Strip"}
          />
          <label
            htmlFor="fromLeftToRight"
            className={tm(
              chapterPagesDisposition === "Long Strip" && "cursor-not-allowed",
            )}
          >
            Left to Right{" "}
          </label>
        </div>
        <div className="flex gap-2">
          <input
            checked={readingDirection === "From right to left"}
            type="radio"
            id="fromRightToLeft"
            name="reading-direction"
            value="From left to right"
            className={tm(
              "size-4 self-center accent-orange-500",
              chapterPagesDisposition === "Long Strip" && "cursor-not-allowed",
            )}
            onChange={() => {
              setReadingDirection("From right to left");
            }}
            disabled={chapterPagesDisposition === "Long Strip"}
          />
          <label
            htmlFor="fromRightToLeft"
            className={tm(
              chapterPagesDisposition === "Long Strip" && "cursor-not-allowed",
            )}
          >
            Right To Left
          </label>
        </div>
      </div>
    </li>
  );
};
export default ReadingDirectionOption;
