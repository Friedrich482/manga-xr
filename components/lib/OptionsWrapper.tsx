import { twMerge as tm } from "tailwind-merge";

const OptionsWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={tm(
        "flex gap-4 max-options-menu-breakpoint-2:flex-col",
        className,
      )}
    />
  );
};
export default OptionsWrapper;
