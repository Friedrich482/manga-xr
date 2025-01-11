import React from "react";
import MainImage from "../MainImage";
import Link from "next/link";
import { SearchResultMangaType } from "@/zod-schema/schema";
import { MAIN_MANGA_ELEMENT_TITLE_LENGTH } from "@/lib/constants";

const ResultMainElement = ({
  manga,
  link,
}: { manga: SearchResultMangaType } & { link?: string }) => {
  const { image, mangaSlug, yearOfRelease, title } = manga;
  return (
    <Link href={link || `/manga/${mangaSlug}`}>
      <div className="group flex w-52 min-w-32 cursor-pointer flex-col items-center justify-center place-self-start transition ease-in-out hover:scale-110">
        <div className="w-full">
          <MainImage title={title} image={image} />
        </div>
        <div className="h-20 w-full">
          <div className="w-full text-wrap text-start text-base font-bold group-hover:text-primary">
            {title.slice(0, MAIN_MANGA_ELEMENT_TITLE_LENGTH) +
              `${title.length >= MAIN_MANGA_ELEMENT_TITLE_LENGTH ? "..." : ""}`}
          </div>
          <div className="text-start font-extralight">{`${yearOfRelease}`}</div>
        </div>
      </div>
    </Link>
  );
};

export default ResultMainElement;
