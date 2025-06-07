import { ELEMENT_TITLE_MAX_LENGTH } from "@/lib/constants";
import { FaSheetPlastic } from "react-icons/fa6";
import Image from "next/image";
import { LatestUpdateType } from "@/zod-schema/schema";
import Link from "next/link";
import { MdAccessTimeFilled } from "react-icons/md";

const MosaicElement = ({
  manga: { chapterSlug, image, title, lastUpdateDate, lastChapter },
}: {
  manga: LatestUpdateType;
}) => (
  <Link
    href={`/chapters/${chapterSlug}`}
    className="group flex h-48 w-[48%] min-w-64 cursor-pointer items-center justify-start gap-5"
  >
    <Image
      className="h-full rounded-lg"
      priority={false}
      alt={title}
      src={image}
      width={140}
      height={192}
    />
    <div className="flex h-full flex-col items-start justify-start">
      <div className="flex h-1/2 w-full items-center justify-start gap-2 text-base font-bold transition duration-300 ease-in-out group-hover:text-primary">
        {title.slice(0, ELEMENT_TITLE_MAX_LENGTH) +
          `${title.length >= ELEMENT_TITLE_MAX_LENGTH ? "..." : ""}`}
      </div>
      <div className="flex h-[40%] items-center gap-2 text-base font-light">
        <FaSheetPlastic />
        {lastChapter}
      </div>
      <div className="flex h-[40%] items-center gap-2 text-base font-light">
        <MdAccessTimeFilled />
        {lastUpdateDate !== "just now"
          ? `${lastUpdateDate} ago`
          : lastUpdateDate}
      </div>
    </div>
  </Link>
);

export default MosaicElement;
