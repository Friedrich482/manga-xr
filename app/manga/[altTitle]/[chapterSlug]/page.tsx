import { headers } from "next/headers";
import NavSection from "@/components/ChapterPage/NavSection";
import { Suspense } from "react";
import ChapterImagesWrapper from "@/components/ChapterPage/ChapterImagesWrapper";
const page = ({ params }: { params: { chapterSlug: string } }) => {
  const { chapterSlug } = params;
  // use the middleware to get the url and extract the manga name from that
  const headersList = headers();
  const headerUrl = headersList.get("x-url") || "";
  const altTitle = headerUrl.substring(
    headerUrl.indexOf("manga") + "manga".length + 1,
    headerUrl.lastIndexOf("/"),
  );
  const chapterTitleFromUrl = chapterSlug.replace("-", " ");
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <Suspense fallback={<div>Loading headers...</div>}>
        <NavSection
          altTitle={altTitle}
          chapterTitleFromUrl={chapterTitleFromUrl}
        />
      </Suspense>
      <Suspense fallback={<div>Loading images...</div>}>
        <ChapterImagesWrapper altTitle={altTitle} chapterSlug={chapterSlug} />
      </Suspense>
    </main>
  );
};
export default page;
