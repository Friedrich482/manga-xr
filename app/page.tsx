import { MostPopular } from "@/components/HomePage";
import { LastReleases } from "@/components/HomePage";
const HomePage = async () => {
  return (
    <main className="flex min-h-lvh w-11/12 flex-col-reverse justify-center gap-x-5 large-nav:flex-row large-nav:justify-end">
      <LastReleases />
      <MostPopular />
    </main>
  );
};
export default HomePage;
