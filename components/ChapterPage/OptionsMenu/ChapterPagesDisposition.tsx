import useStore from "@/hooks/store";

const ChapterPagesDisposition = () => {
  const { chapterPagesDisposition, setChapterPagesDisposition } = useStore(
    (state) => ({
      chapterPagesDisposition: state.chapterPagesDisposition,
      setChapterPagesDisposition: state.setChapterPagesDisposition,
    }),
  );
  return (
    <li className="mb-5 mt-6 flex w-full flex-wrap items-center gap-4">
      <label htmlFor="pagesDirection">Chapter pages disposition:</label>
      <div className="mt-1 flex gap-4 max-chapters-breakpoint:flex-col">
        <div className="flex gap-2">
          <input
            type="radio"
            checked={chapterPagesDisposition === "Long Strip"}
            id="longStrip"
            name="pages-direction"
            value="Long Strip"
            className="size-4 self-center accent-orange-500"
            onChange={() => {
              setChapterPagesDisposition("Long Strip");
            }}
          />
          <label htmlFor="longStrip">Long Strip</label>
        </div>
        <div className="flex gap-2">
          <input
            checked={chapterPagesDisposition === "Single Page"}
            type="radio"
            id="singlePage"
            name="pages-direction"
            value="Single Page"
            className="size-4 self-center accent-orange-500"
            onChange={() => {
              setChapterPagesDisposition("Single Page");
            }}
          />
          <label htmlFor="singlePage">Single Page</label>
        </div>
      </div>
    </li>
  );
};
export default ChapterPagesDisposition;
