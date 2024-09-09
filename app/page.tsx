import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import LastReleases from "@/components/HomePage/LastReleases/LastReleases";
import Main from "@/components/lib/Main";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
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
