import { FETCH_LATEST_UPDATES_TAG } from "@/lib/cache-keys/unstable_cache";
import MangaElement from "@/components/MainMangaElement";
import ReloadDataButton from "@/components/lib/ReloadDataButton";
import { fetchLatestUpdates } from "@/utils/fetch/fetchLatestUpdates";

const LastReleasesList = async () => {
  const latestUpdates = await fetchLatestUpdates();

  if (!latestUpdates || latestUpdates.length === 0) {
    return <ReloadDataButton tag={FETCH_LATEST_UPDATES_TAG} />;
  }

  return (
    <div className="grid w-5/6 min-w-32 grid-cols-1 gap-x-6 gap-y-20 min-[450px]:grid-cols-2 min-[760px]:grid-cols-3 min-[1400px]:grid-cols-4">
      {latestUpdates.map((manga) => (
        <MangaElement manga={manga} key={manga.title} />
      ))}
    </div>
  );
};

export { LastReleasesList as default };
