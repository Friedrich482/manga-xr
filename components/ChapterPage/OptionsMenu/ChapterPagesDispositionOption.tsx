import useStore from "@/hooks/store";
import { chapterPagesDisposition } from "@/zod-schema/schema";
const pagesDispositions: {
  content: chapterPagesDisposition;
  id: string;
  value: chapterPagesDisposition;
}[] = [
  { content: "Long Strip", id: "longStrip", value: "Long Strip" },
  { content: "Single Page", id: "singlePage", value: "Single Page" },
];
const ChapterPagesDispositionOption = () => {
  const { chapterPagesDisposition, setChapterPagesDisposition } = useStore(
    (state) => ({
      chapterPagesDisposition: state.chapterPagesDisposition,
      setChapterPagesDisposition: state.setChapterPagesDisposition,
    }),
  );
  return (
    <li className="mb-5 mt-6 flex w-full flex-wrap items-center gap-4">
      <div>Chapter pages disposition:</div>
      <div className="max-options-menu-breakpoint-1:flex-col mt-1 flex gap-4">
        {pagesDispositions.map((pageDisposition) => {
          const { content, id, value } = pageDisposition;
          return (
            <div className="space-x-2 space-y-2" key={content}>
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
export default ChapterPagesDispositionOption;
