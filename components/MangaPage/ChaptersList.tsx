import Link from "next/link";

const ChaptersList = ({
  chapters,
  altTitle,
  finalData,
}: {
  chapters: { chapterTitle: string; chapterReleaseDate: string }[];
  altTitle: string;
  finalData: string;
}) => {
  return chapters.length === 0 ? (
    <p className="flex gap-x-1 place-self-start self-start border border-transparent py-2 pl-6">
      No result found for <span className="text-orange-400">{finalData}</span>
    </p>
  ) : (
    <ul className="flex w-full flex-col items-center justify-start gap-y-5">
      {chapters.map((chapter) => {
        const { chapterReleaseDate, chapterTitle } = chapter;
        return (
          <li key={chapter.chapterTitle} className=" w-full cursor-pointer">
            <Link
              href={`/manga/${altTitle}/${chapterTitle}`}
              className="group flex w-full items-center justify-between rounded-lg border border-neutral-500/50 py-2 hover:border-neutral-500 hover:bg-neutral-700/25 max-chapters-breakpoint:flex-col"
            >
              <span className="group-hover:text-orange-400 chapters-breakpoint:pl-6">
                {chapterTitle}
              </span>
              <span className="chapters-breakpoint:pr-6">
                {chapterReleaseDate}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ChaptersList;
