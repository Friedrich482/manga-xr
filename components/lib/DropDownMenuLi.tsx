import { twMerge as tm } from "tailwind-merge";

const DropDownMenuLi = ({
  isActive,
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement> & { isActive?: boolean }) => {
  return (
    <li
      className={tm(
        "w-full cursor-pointer justify-start rounded-lg border border-transparent p-1 hover:bg-neutral-300 dark:hover:bg-neutral-700",
        isActive &&
          "rounded-lg border-orange-400 hover:border-orange-600 hover:bg-transparent dark:hover:bg-transparent",
        className,
      )}
      {...props}
    />
  );
};
export default DropDownMenuLi;