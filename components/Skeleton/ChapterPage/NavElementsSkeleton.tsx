const NavElementsSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      <div className="flex h-12 w-36 animate-pulse items-center justify-around gap-x-1 rounded-md border border-neutral-500/50 bg-neutral-300 px-2 py-1 hover:border-neutral-500 dark:bg-neutral-600 options-menu-breakpoint-2:w-44 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3"></div>
      <div className="flex h-12 w-36 animate-pulse items-center justify-around gap-x-1 rounded-md border border-neutral-500/50 bg-neutral-300 px-2 py-1 hover:border-neutral-500 dark:bg-neutral-600 options-menu-breakpoint-2:w-44 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3"></div>
      <div className="flex flex-wrap gap-2">
        <div className="flex h-12 w-32 animate-pulse items-center justify-center gap-x-1 rounded-md border border-neutral-800/50 bg-neutral-300 px-2 py-1 hover:border-neutral-500 disabled:cursor-not-allowed dark:border-neutral-500/50 dark:bg-neutral-600 dark:active:border-neutral-500 options-menu-breakpoint-2:w-36 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3 options-menu-breakpoint-2:px-4"></div>
        <div className="flex h-12 w-32 animate-pulse items-center justify-center gap-x-1 rounded-md border border-neutral-800/50 bg-neutral-300 px-2 py-1 hover:border-neutral-500 disabled:cursor-not-allowed dark:border-neutral-500/50 dark:bg-neutral-600 dark:active:border-neutral-500 options-menu-breakpoint-2:w-36 options-menu-breakpoint-2:justify-around options-menu-breakpoint-2:gap-x-3 options-menu-breakpoint-2:px-4"></div>
      </div>
    </div>
  );
};
export default NavElementsSkeleton;
