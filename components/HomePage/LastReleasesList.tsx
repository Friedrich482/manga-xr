import { Suspense } from "react";
import MainElementSkeleton from "../Skeleton/MainElementSkeleton";
import LastReleasesElement from "./LastReleasesElement";
import mainFetch from "@/actions/mainFetch";
const lastReleasedNumber = 21;

const LastReleasesList = async () => {
  await mainFetch();
  const list = Array(lastReleasedNumber)
    .fill(0)
    .map((_, i) => i);
  return (
    <div className="mt-4 flex w-full min-w-32 flex-wrap items-center justify-center gap-x-8 gap-y-12">
      {list.map((element) => {
        return (
          <Suspense key={element} fallback={<MainElementSkeleton />}>
            <LastReleasesElement id={element} key={element} />
          </Suspense>
        );
      })}
    </div>
  );
};
export { LastReleasesList as default, lastReleasedNumber };
