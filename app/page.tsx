import LargeMostPopular from "@/components/home-page/popular/large/LargeMostPopular";
import LastReleases from "@/components/home-page/last-releases/LastReleases";
import Main from "@/components/lib/Main";
import SmallMostPopular from "@/components/home-page/popular/small/SmallMostPopular";
import { metadata } from "./layout";
const HomePage = () => {
  metadata.title = "MangaXR";
  return (
    <Main className="max-large-nav:flex-col large-nav:justify-end">
      <LastReleases />
      <LargeMostPopular />
      <SmallMostPopular />
    </Main>
  );
};
export default HomePage;
