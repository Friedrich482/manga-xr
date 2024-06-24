import LastReleasesElement from "./LastReleasesElement";
import { fetchLatestUpdates } from "@/utils/manga/fetchLatestUpdates";

const LastReleasesList = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log("Waited 5 secondes");
  const latestUpdates = await fetchLatestUpdates();
  if (latestUpdates) {
    return (
      <div className="mt-4 flex w-5/6 min-w-32 flex-wrap items-center justify-start gap-x-8 gap-y-12">
        {latestUpdates.map((manga) => {
          return <LastReleasesElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};
export { LastReleasesList as default };
