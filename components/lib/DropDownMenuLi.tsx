import { twMerge as tm } from "tailwind-merge";

const DropDownMenuLi = ({
  isActive,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement> & { isActive?: boolean }) => {
  return (
    <li
      className={tm(
        "flex w-full cursor-pointer items-center justify-start rounded-lg border border-transparent px-2 py-1 hover:bg-neutral-300 dark:hover:bg-neutral-700",
        isActive &&
          "rounded-lg border-orange-400 hover:border-orange-600 hover:bg-transparent dark:hover:bg-transparent",
      )}
      {...props}
    />
  );
};
export default DropDownMenuLi;
