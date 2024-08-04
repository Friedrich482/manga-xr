import { twMerge as tm } from "tailwind-merge";

const DropDownWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={tm("relative min-w-32 space-y-2", className)} />
  );
};
export default DropDownWrapper;
