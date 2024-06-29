import { headers } from "next/headers";
import ChapterImages from "@/components/ChapterPage/ChapterImages";
import NavSection from "@/components/ChapterPage/NavSection";

const page = ({ params }: { params: { chapter: string } }) => {
  const { chapter } = params;

  // use the middleware to get the url and extract the manga name from that
  const headersList = headers();
  const headerUrl = headersList.get("x-url") || "";
  const altTitle = headerUrl.substring(
    headerUrl.indexOf("manga") + "manga".length + 1,
    headerUrl.lastIndexOf("/"),
  );
  const parsedChapter = chapter.replace("-", " ");
  return (
    <main className="mt-20 flex min-h-lvh w-11/12 flex-col items-center justify-start">
      <section className="flex w-5/6 flex-col items-center justify-start self-center">
        <NavSection altTitle={altTitle} chapter={parsedChapter} />
        <ChapterImages />
      </section>
    </main>
  );
};
export default page;
