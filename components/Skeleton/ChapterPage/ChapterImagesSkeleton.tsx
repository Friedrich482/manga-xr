"use client";
import { clipLoaderColor } from "@/lib/constants";
import { ClipLoader } from "react-spinners";

const list = Array(10)
  .fill(0)
  .map((_, i) => i);

const ChapterImagesSkeleton = () => {
  return (
    <section className="flex w-5/6 flex-col items-center justify-start self-center">
      <div className="flex w-full flex-col gap-44">
        {list.map((element) => (
          <div
            className="flex w-full items-center justify-center"
            key={element}
          >
            <ClipLoader
              color={clipLoaderColor}
              size={100}
              speedMultiplier={1}
              cssOverride={{ borderWidth: "8px" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default ChapterImagesSkeleton;
