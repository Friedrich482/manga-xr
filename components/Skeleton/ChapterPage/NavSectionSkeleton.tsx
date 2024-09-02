import NavElementsSkeleton from "./NavElementsSkeleton";

const NavSectionSkeleton = () => {
  return (
    <section className="flex w-5/6 flex-col items-center justify-center gap-8 self-center text-xl">
      <h2 className="h-8 w-2/3 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></h2>
      <NavElementsSkeleton />
    </section>
  );
};
export default NavSectionSkeleton;
