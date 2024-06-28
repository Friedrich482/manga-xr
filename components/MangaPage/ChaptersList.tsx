import Link from "next/link";

const ChaptersList = ({
  chapters,
  altTitle,
}: {
  chapters: { chapterTitle: string; chapterReleaseDate: string }[];
  altTitle: string;
}) => {
  return (
    <ul className="flex w-full flex-col items-center justify-start gap-y-5">
      {chapters.map((chapter) => {
        const { chapterReleaseDate, chapterTitle } = chapter;
        return (
          <li key={chapter.chapterTitle} className=" w-full cursor-pointer">
            <Link
              href={`/manga/${altTitle}/${chapterTitle}`}
              className="group flex w-full items-center justify-between rounded-lg border border-neutral-500/50 py-2 hover:border-neutral-500 hover:bg-neutral-700/25"
            >
              <span className="pl-6 group-hover:text-orange-400">
                {chapterTitle}
              </span>
              <span className="pr-6">{chapterReleaseDate}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ChaptersList;
