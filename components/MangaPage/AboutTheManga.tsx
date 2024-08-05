import Link from "next/link";

const AboutTheManga = ({
  infos,
  arrayOfGenres,
}: {
  arrayOfGenres: string[];
  infos: {
    title: string;
    content: string;
  }[];
}) => {
  return (
    <div className="flex w-11/12 flex-col gap-10 place-self-start">
      {infos.map((element) => (
        <div
          key={element.title}
          className="rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500"
        >
          <span className="text-red-700">{element.title}</span>:{" "}
          {element.content}
        </div>
      ))}
      <div className="flex flex-col items-start justify-center gap-5 text-lg">
        <p className="text-red-700">
          Genres<span className="text-white">:</span>
        </p>
        <div className="flex flex-wrap items-center justify-start gap-4">
          {arrayOfGenres.map((genre) => (
            <Link
              href={`/search?name=${genre.toLowerCase()}`}
              className="rounded-xl border border-b-2 border-r-2 border-zinc-600 border-b-violet-500 border-r-violet-500 px-3 py-1 text-neutral-800/85 hover:text-black dark:text-neutral-300 dark:hover:text-white"
              key={genre}
            >
              {genre}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutTheManga;
