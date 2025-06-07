import { FETCH_LATEST_UPDATES_TAG } from "@/lib/cache-keys/unstable_cache";
import MangaElement from "@/components/MainMangaElement";
import MosaicElement from "./MosaicElement";
import ReloadDataButton from "@/components/lib/ReloadDataButton";
import { fetchLatestUpdates } from "@/utils/fetch/fetchLatestUpdates";

const LastReleasesList = async () => {
  const latestUpdates = await fetchLatestUpdates();

  if (!latestUpdates || latestUpdates.length === 0) {
    return <ReloadDataButton tag={FETCH_LATEST_UPDATES_TAG} />;
  }

  return (
    <>
      <div className="hidden w-5/6 min-w-32 flex-wrap items-center justify-around gap-x-6 gap-y-12 large-nav:flex min-[1000px]:hidden min-[1200px]:flex">
        {latestUpdates.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </div>

      <div className="flex w-5/6 min-w-32 flex-row flex-wrap justify-between gap-y-12 large-nav:hidden min-[1000px]:flex">
        {latestUpdates.map((manga) => {
          return <MosaicElement manga={manga} key={manga.title} />;
        })}
      </div>
    </>
  );
};

export { LastReleasesList as default };
