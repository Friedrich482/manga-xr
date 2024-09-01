import MainElementSkeleton from "./MainElementSkeleton";

const list = Array(21)
  .fill(0)
  .map((_, i) => i);

const HistorySkeleton = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-12">
      {list.map((element) => (
        <MainElementSkeleton key={element} />
      ))}
    </div>
  );
};
export default HistorySkeleton;
