import { metadata } from "@/app/layout";
import AboutMeSection from "@/components/DashBoard/AboutMeSection";
import SubNavBar from "@/components/DashBoard/SubNavBar";

const page = () => {
  metadata.title = "Dashboard | MangaXR";
  return (
    <>
      <SubNavBar />
      <AboutMeSection />
    </>
  );
};
export default page;
