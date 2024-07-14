const NavElementsSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap justify-between gap-4">
      <button className="flex h-10 w-44 animate-pulse items-center justify-around gap-x-3 rounded-lg bg-neutral-300 px-2 py-1 dark:bg-neutral-600"></button>
      <button className="flex h-10 w-44 animate-pulse items-center justify-around gap-x-3 rounded-lg bg-neutral-300 px-2 py-1 dark:bg-neutral-600"></button>
      <div className="flex flex-wrap gap-2">
        <div className="flex h-10 w-36 animate-pulse justify-center gap-1 rounded-lg bg-neutral-300 px-4 py-1 dark:bg-neutral-600"></div>
        <div className="flex h-10 w-36 animate-pulse justify-center gap-1 rounded-lg bg-neutral-300 px-4 py-1 dark:bg-neutral-600"></div>
      </div>
    </div>
  );
};
export default NavElementsSkeleton;
