import NavElementsSkeleton from "./NavElementsSkeleton";

const NavSectionSkeleton = () => {
  return (
    <section className="mb-8 flex w-5/6 flex-wrap gap-4 self-center">
      <h2 className="mx-auto mb-4 h-8 w-2/3 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></h2>
      <NavElementsSkeleton />
    </section>
  );
};
export default NavSectionSkeleton;
