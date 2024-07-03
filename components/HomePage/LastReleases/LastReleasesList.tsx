import MangaElement from "@/components/MainMangaElement";
import { fetchLatestUpdates } from "@/utils/fetch/fetchLatestUpdates";

const LastReleasesList = async () => {
  const latestUpdates = await fetchLatestUpdates();
  if (latestUpdates) {
    return (
      <div className="mt-4 flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-6 gap-y-12">
        {latestUpdates.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};
export { LastReleasesList as default };
