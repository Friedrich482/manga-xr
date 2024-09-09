import { MenuPosition } from "@/zod-schema/schema";
import { forwardRef } from "react";
import { twMerge as tm } from "tailwind-merge";

const DropDownMenu = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { menuPosition?: MenuPosition | null }
>(({ menuPosition, className, ...props }, ref) => {
  return (
    <div
      className={tm(
        "absolute z-50 max-h-80 w-full overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white py-2 pl-2 dark:bg-default-black max-options-menu-breakpoint-2:text-base",
        menuPosition === "top of the button" && "-translate-y-[117%]",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

DropDownMenu.displayName = "DropDownMenu";

export default DropDownMenu;
