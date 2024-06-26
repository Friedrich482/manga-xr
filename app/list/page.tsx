import { redirect } from "next/navigation";

const ListPage = () => {
  redirect("/list/numbers");
  return (
    <section className="flex h-lvh items-center justify-center">
      {" "}
      Nothing to see here...
    </section>
  );
};
export default ListPage;
