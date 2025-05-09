import LettersSection from "@/components/list-page/LettersSection";

const ListPageLayout = async (props: {
  children: React.ReactNode;
  params: Promise<{ index: string }>;
}) => {
  const { index: characterFromUrl } = await props.params;

  const { children } = props;

  return (
    <>
      <LettersSection characterFromUrl={characterFromUrl} />
      {children}
    </>
  );
};
export default ListPageLayout;
