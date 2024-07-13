import MainElementSkeleton from "./MainElementSkeleton";

const list = Array(21)
  .fill(0)
  .map((_, i) => i);
const LatestUpdatesSkeleton = () => {
  return (
    <div className="mt-4 flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-8 gap-y-12">
      {list.map((element) => (
        <MainElementSkeleton key={element} />
      ))}
    </div>
  );
};
export default LatestUpdatesSkeleton;
