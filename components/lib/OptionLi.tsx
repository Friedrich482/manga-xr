import { twMerge as tm } from "tailwind-merge";

const OptionLi = ({
  disabledCondition,
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & { disabledCondition?: boolean }) => {
  return (
    <li
      className={tm(
        "flex w-full flex-wrap items-center gap-4",
        className,
        disabledCondition && "cursor-not-allowed text-neutral-500/50",
      )}
      {...props}
    />
  );
};
export default OptionLi;
