import { twMerge as tm } from "tailwind-merge";

const OptionInputTitle = ({
  disabledCondition,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { disabledCondition?: boolean }) => {
  return (
    <div
      {...props}
      className={tm(
        "transition duration-300 ease-in-out",
        className,
        disabledCondition && "cursor-not-allowed text-neutral-500/50",
      )}
    />
  );
};
export default OptionInputTitle;
