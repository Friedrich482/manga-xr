import MainElementSkeleton from "./MainElementSkeleton";

const list = Array(30)
  .fill(0)
  .map((_, i) => i);
const ListPageSkeleton = () => {
  return (
    <section className="flex w-10/12 flex-wrap items-center justify-start gap-12">
      {list.map((element) => (
        <MainElementSkeleton key={element} />
      ))}
    </section>
  );
};
export default ListPageSkeleton;
