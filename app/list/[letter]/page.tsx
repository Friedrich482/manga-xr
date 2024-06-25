const page = ({ params }: { params: { letter: string } }) => {
  const { letter } = params;
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      {letter}
    </main>
  );
};
export default page;
