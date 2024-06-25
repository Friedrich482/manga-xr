import { redirect } from "next/navigation";

const ListPage = () => {
  redirect("/list/numbers");
  return (
    <main className="flex min-h-lvh items-center justify-center text-2xl">
      You&apos;re not supposed to be here
    </main>
  );
};
export default ListPage;
