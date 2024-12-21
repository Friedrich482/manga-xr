import LettersSection from "@/components/list-page/LettersSection";

const ListPageLayout = async (
  props: {
    children: React.ReactNode;
    params: Promise<{ index: string }>;
  }
) => {
  const params = await props.params;

  const {
    children
  } = props;

  const { index: characterFromUrl } = params;
  return (
    <>
      <LettersSection characterFromUrl={characterFromUrl} />
      {children}
    </>
  );
};
export default ListPageLayout;
