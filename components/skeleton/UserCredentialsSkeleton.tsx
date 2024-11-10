const items = ["Username", "Email"];
const UserCredentialsSkeleton = () => {
  return (
    <>
      {/* preview credentials skeleton */}

      <div className="flex min-h-48 w-[max(80%,16rem)] flex-wrap justify-between gap-4 place-self-start">
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            return (
              <p key={item} className="flex h-7 flex-nowrap gap-1">
                <span className="h-6 text-primary">{item}:</span>{" "}
                <span className="inline-block h-6 w-44 animate-pulse rounded-lg bg-neutral-300 dark:bg-neutral-600"></span>
              </p>
            );
          })}
        </div>
        <div className="relative flex min-h-96 flex-col gap-4">
          <p className="text-primary">Profile image:</p>
          <div className="size-56 animate-pulse cursor-pointer rounded-full bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
      </div>
      <div className="flex h-10 w-[5.3125rem] animate-pulse items-center justify-center place-self-start rounded-lg bg-neutral-300 px-4 py-2 dark:bg-neutral-600"></div>
    </>
  );
};
export default UserCredentialsSkeleton;
