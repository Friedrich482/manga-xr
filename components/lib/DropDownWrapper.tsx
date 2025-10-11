import { twMerge as tm } from "tailwind-merge";

const DropDownWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={tm("relative flex min-w-32 flex-col gap-2", className)}
    />
  );
};
export default DropDownWrapper;
