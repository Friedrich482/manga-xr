import LargeMostPopular from "@/components/HomePage/Popular/Large/LargeMostPopular";
import SmallMostPopular from "@/components/HomePage/Popular/Small/SmallMostPopular";
import LastReleases from "@/components/HomePage/LastReleases/LastReleases";
import { metadata } from "./layout";
import Main from "@/components/lib/Main";
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
