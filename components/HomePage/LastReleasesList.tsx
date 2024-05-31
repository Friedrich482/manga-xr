import { Suspense } from "react";
import LastReleasesSkeleton from "./LastReleasesSkeleton";
import LastReleasesElement from "./LastReleasesElement";

const lastReleasedNumber = 21;

const LastReleasesList = async () => {
  // ! lastReleasesFetch();
  const list = Array(lastReleasedNumber)
    .fill(0)
    .map((_, i) => i);
  return (
    <div className="mt-4 flex w-full min-w-32 flex-wrap items-center justify-center gap-x-8 gap-y-12">
      {list.map((element) => {
        return (
          <Suspense key={element} fallback={<LastReleasesSkeleton />}>
            <LastReleasesElement id={element} key={element} />
          </Suspense>
        );
      })}
    </div>
  );
};
export { LastReleasesList as default, lastReleasedNumber };
