import { IoIosCloseCircleOutline } from "react-icons/io";
import { twMerge as tm } from "tailwind-merge";

const list = Array(10)
  .fill(0)
  .map((_, i) => i);
const length = list.length;
const ProgressBarSkeleton = () => {
  return (
    <section className="group fixed bottom-2 flex h-6 w-[97svw] items-end place-self-center">
      <div className="h-1 w-full rounded-lg bg-transparent group-hover:h-3 group-hover:bg-neutral-500/50">
        <ul className="flex h-full w-full gap-x-[0.5px]">
          {list.map((element, index) => {
            return (
              <li
                key={element}
                className={tm(
                  "h-full cursor-pointer border-x border-x-transparent bg-transparent",
                  index !== 0 &&
                    "border-l-transparent group-hover:border-l-neutral-500/50",
                  index !== length - 1 &&
                    "border-r-transparent group-hover:border-r-neutral-500/50",
                )}
                style={{ width: `${100 / length}%` }}
              >
                <button
                  className={tm(
                    "flex h-full w-full rounded-lg border border-transparent hover:border-orange-500",
                    index === 0 &&
                      "bg-orange-500/50 group-hover:bg-orange-500/70",
                  )}
                  title="Please wait until the loading is complete"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className={tm(
          "absolute bottom-8 left-4 place-self-start text-neutral-500/80 hover:text-neutral-300",
        )}
      >
        <IoIosCloseCircleOutline className="size-6" />
      </button>
    </section>
  );
};
export default ProgressBarSkeleton;
