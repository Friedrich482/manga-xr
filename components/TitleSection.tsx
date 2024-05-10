import Link from "next/link";
import Image from "next/image";
const TitleSection = () => {
  return (
    <Link
      href={"/"}
      className="flex w-3/12 cursor-pointer items-center justify-center gap-2"
    >
      <Image
        className="aspect-square rounded-full"
        src={`/assets/logo.svg`}
        alt={"logo"}
        width={40}
        height={40}
        priority={false}
      />
      <span className=" text-end text-3xl font-extrabold">Manga-R</span>
    </Link>
  );
};
export default TitleSection;
