import Image from "next/image";
import Link from "next/link";
import Main from "@/components/lib/Main";
import PrincipalSection from "@/components/lib/PrincipalSection";

const notFound = () => {
  return (
    <Main className="w-full">
      <PrincipalSection className="w-11/12 self-start">
        <Image
          alt="404-not-found"
          src="/assets/not-found.svg"
          priority
          width={300}
          height={300}
        />
        <h2 className="text-4xl font-bold">Error 404</h2>
        <p className="text-4xl font-bold">Page not found</p>
        <Link
          href="/"
          className="flex h-10 items-center justify-center place-self-center rounded-lg border border-neutral-800/50 bg-neutral-950 px-4 py-2 font-bold text-white  dark:bg-neutral-100 dark:text-black dark:hover:bg-white/80"
        >
          Go Back Home
        </Link>
      </PrincipalSection>
    </Main>
  );
};
export default notFound;
