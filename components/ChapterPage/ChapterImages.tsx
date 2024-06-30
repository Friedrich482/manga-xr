"use client";
import Image from "next/image";
import useStore from "@/hooks/store";

const ChapterImages = ({ images }: { images: string[] }) => {
  const { width, isResizable, gapOption } = useStore();
  return (
    <section
      className={`flex w-5/6 flex-col items-center justify-start self-center`}
      style={isResizable ? { width: width } : {}}
    >
      <div className="flex w-full flex-col" style={{ rowGap: gapOption.value }}>
        {images.map((image) => {
          const index = images.indexOf(image);
          return (
            <Image
              alt={`page ${index}`}
              src={image}
              width={500}
              height={600}
              className="h-auto w-full"
              key={`${index}`}
            />
          );
        })}
      </div>
    </section>
  );
};
export default ChapterImages;
