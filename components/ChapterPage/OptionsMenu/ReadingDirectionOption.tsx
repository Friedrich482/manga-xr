import useStore from "@/hooks/store";
import { readingDirection } from "@/zod-schema/schema";
import { twMerge as tm } from "tailwind-merge";
const arrayOfDirections: {
  content: readingDirection;
  id: string;
  value: readingDirection;
}[] = [
  {
    content: "From left to right",
    id: "fromLeftToRight",
    value: "From left to right",
  },
  {
    content: "From right to left",
    id: "fromRightToLeft",
    value: "From right to left",
  },
];

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
      <div
        className={tm(
          "transition duration-300 ease-in-out",
          chapterPagesDisposition === "Long Strip" && "cursor-not-allowed",
        )}
      >
        Reading Direction:
      </div>
      <div className="max-options-menu-breakpoint-2:flex-col mt-1 flex gap-4 transition duration-300 ease-in-out">
        {arrayOfDirections.map((direction) => {
          const { content, id, value } = direction;
          return (
            <div className="space-x-2 space-y-2" key={content}>
              <input
                type="radio"
                checked={readingDirection === content}
                id={id}
                name="reading-direction"
                value={value}
                className={tm(
                  "size-4 self-center accent-orange-500",
                  chapterPagesDisposition === "Long Strip" &&
                    "cursor-not-allowed",
                )}
                onChange={() => {
                  setReadingDirection(content);
                }}
                disabled={chapterPagesDisposition === "Long Strip"}
              />
              <label
                htmlFor={id}
                className={tm(
                  chapterPagesDisposition === "Long Strip" &&
                    "cursor-not-allowed",
                )}
              >
                {content}
              </label>
            </div>
          );
        })}
      </div>
    </li>
  );
};
export default ReadingDirectionOption;
