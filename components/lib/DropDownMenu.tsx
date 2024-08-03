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
        "absolute z-20 max-h-80 overflow-y-scroll rounded-lg border border-neutral-800 bg-default-white p-2 dark:bg-default-black max-options-menu-breakpoint-2:text-base",
        "translate-y-[13%]",
        menuPosition === "top of the button" && "-translate-y-[102%]",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

export default DropDownMenu;
