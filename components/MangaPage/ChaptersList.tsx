const ChaptersList = ({ chapters }: { chapters: string[] }) => {
  return (
    <ul className="flex w-full flex-col items-center justify-start gap-y-1">
      {chapters.map((chapter) => (
        <li
          key={chapter}
          className="w-full cursor-pointer hover:text-orange-400"
        >
          {chapter}
        </li>
      ))}
    </ul>
  );
};
export default ChaptersList;
