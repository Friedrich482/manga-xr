import LettersSection from "@/components/ListPage/LettersSection";
const ListPageLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { index: string };
}) => {
  const { index: characterFromUrl } = params;
  return (
    <>
      <LettersSection characterFromUrl={characterFromUrl} />
      {children}
    </>
  );
};
export default ListPageLayout;
