import { metadata } from "@/app/layout";
import SubNavBar from "@/components/DashBoard/SubNavBar";
import Main from "@/components/lib/Main";

const page = () => {
  metadata.title = "Dashboard | MangaXR";
  return (
    <>
      <SubNavBar />
      <Main>Dashboard</Main>
    </>
  );
};
export default page;
