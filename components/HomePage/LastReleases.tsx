import LastReleasesList from "./LastReleasesList";
const LastReleases = async () => {
  return (
    <section className="flex w-3/4 flex-col items-center justify-start self-center">
      <h2 className="mb-6 mt-12 w-full text-center text-3xl text-neutral-700 hover:text-default-black dark:border-neutral-500 dark:text-neutral-300 dark:hover:text-default-white">
        Last Releases
      </h2>
      <LastReleasesList />
    </section>
  );
};
export default LastReleases;
