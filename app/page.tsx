import { MostPopular } from "@/components/HomePage";
import { LastReleases } from "@/components/HomePage";
const HomePage = () => {
  return (
    <main className="flex min-h-lvh w-full justify-center large-nav:justify-end">
      <MostPopular />
      <LastReleases />
    </main>
  );
};
export default HomePage;
