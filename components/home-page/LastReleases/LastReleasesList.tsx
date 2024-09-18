import { FETCH_LATEST_UPDATES_TAG } from "@/lib/cache-keys/unstable_cache";
import MangaElement from "@/components/MainMangaElement";
import ReloadDataButton from "@/components/lib/ReloadDataButton";
import { fetchLatestUpdates } from "@/utils/fetch/fetchLatestUpdates";

const LastReleasesList = async () => {
  const latestUpdates = await fetchLatestUpdates();
  if (!latestUpdates || latestUpdates.length === 0) {
    return <ReloadDataButton tag={FETCH_LATEST_UPDATES_TAG} />;
  } else {
    return (
      <div className="flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-6 gap-y-12">
        {latestUpdates.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};
export { LastReleasesList as default };
