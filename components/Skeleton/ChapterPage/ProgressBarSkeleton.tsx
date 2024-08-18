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
                    "hover:border-primary flex h-full w-full rounded-lg border border-transparent",
                    index === 0 && "bg-primary/50 group-hover:bg-primary/70",
                  )}
                  title="Please wait until the loading is complete"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
export default ProgressBarSkeleton;
