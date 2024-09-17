import LargeMostPopular from "@/components/home-page/Popular/Large/LargeMostPopular";
import LastReleases from "@/components/home-page/LastReleases/LastReleases";
import Main from "@/components/lib/Main";
import SmallMostPopular from "@/components/home-page/Popular/Small/SmallMostPopular";
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
