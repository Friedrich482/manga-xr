import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import LastReleases from "@/components/HomePage/LastReleases/LastReleases";
import { metadata } from "./layout";
const HomePage = () => {
  metadata.title = "MangaXR";
  return (
    <main className="flex min-h-lvh w-11/12 justify-center gap-x-5 max-large-nav:flex-col large-nav:justify-end">
      <LastReleases />
      <LargeMostPopular />
      <SmallMostPopular />
    </main>
  );
};
export default HomePage;
