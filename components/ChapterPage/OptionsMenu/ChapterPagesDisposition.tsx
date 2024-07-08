import useStore, { chapterPagesDisposition } from "@/hooks/store";

const ChapterPagesDisposition = () => {
  const { chapterPagesDisposition, setChapterPagesDisposition } = useStore(
    (state) => ({
      chapterPagesDisposition: state.chapterPagesDisposition,
      setChapterPagesDisposition: state.setChapterPagesDisposition,
    }),
  );
  const pagesDispositions: {
    content: chapterPagesDisposition;
    id: string;
    value: chapterPagesDisposition;
  }[] = [
    { content: "Long Strip", id: "longStrip", value: "Long Strip" },
    { content: "Single Page", id: "singlePage", value: "Single Page" },
  ];
  return (
    <li className="mb-5 mt-6 flex w-full flex-wrap items-center gap-4">
      <label htmlFor="pagesDirection">Chapter pages disposition:</label>
      <div className="mt-1 flex gap-4 max-chapters-breakpoint:flex-col">
        {pagesDispositions.map((pageDisposition) => {
          const { content, id, value } = pageDisposition;
          return (
            <div className="flex gap-2" key={content}>
              <input
                type="radio"
                checked={chapterPagesDisposition === content}
                id={id}
                name="pages-direction"
                value={value}
                className="size-4 self-center accent-orange-500"
                onChange={() => {
                  setChapterPagesDisposition(content);
                }}
              />
              <label htmlFor={id}>{content}</label>
            </div>
          );
        })}
      </div>
    </li>
  );
};
export default ChapterPagesDisposition;
