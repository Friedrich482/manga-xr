import Link from "next/link";

type InfoArray = readonly [
  {
    readonly title: "Author";
    readonly content: string;
  },
  {
    readonly title: "Year of release";
    readonly content: string;
  },
  {
    readonly title: "Last updated";
    readonly content: string;
  },
];

const AboutTheManga = ({
  infos,
  arrayOfGenres,
}: {
  arrayOfGenres: string[];
  infos: InfoArray;
}) => (
  <div className="flex w-11/12 flex-col gap-10 place-self-start">
    {infos.map(({ content, title }) => (
      <div
        key={title}
        className="rounded-sm border-l-2 border-l-neutral-700 pl-2 text-lg dark:border-l-neutral-500"
      >
        <span className="text-primary">{title}</span>: {content}{" "}
        {/* if the manga date of last update is less than 24 hours, add "ago" */}
        {title === "Last updated" &&
          (content.at(-1) === "h" || content.at(-1) === "m") &&
          "ago"}
      </div>
    ))}
    <div className="flex flex-col items-start justify-center gap-5 text-lg">
      <p className="text-primary">
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
export default AboutTheManga;
