import { metadata } from "@/app/layout";

const page = ({ params }: { params: { index: string } }) => {
  const { index } = params;
  metadata.title = `List : ${index}`;
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      {index}
    </main>
  );
};
export default page;
