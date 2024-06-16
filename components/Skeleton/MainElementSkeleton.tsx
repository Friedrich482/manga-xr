const MainElementSkeleton = () => {
  return (
    <div className="group flex w-52 min-w-32 flex-col items-center justify-center place-self-start border-neutral-300 dark:bg-default-black">
      <div className="h-72 min-h-32 w-52 min-w-32 animate-pulse cursor-pointer rounded-lg bg-neutral-300 dark:bg-neutral-800"></div>
      <div className="flex h-20 w-full flex-col items-start justify-center gap-3">
        <div className="h-8 w-full animate-pulse text-wrap rounded-lg bg-neutral-300 text-start text-base font-bold dark:bg-neutral-800"></div>
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-neutral-300 text-start font-extralight dark:bg-neutral-800"></div>
      </div>
    </div>
  );
};
export default MainElementSkeleton;
