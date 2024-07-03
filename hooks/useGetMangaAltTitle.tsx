import { usePathname } from "next/navigation";

// This is a hook to get the slug of a manga in deep nested client components on the
// chapter page of a manga

const useGetMangaAltTitle = () => {
  const pathName = usePathname();

  const altTitle = pathName.substring(
    pathName.indexOf("/") + 2 + "manga".length,
    pathName.lastIndexOf("/"),
  );
  return altTitle;
};

export default useGetMangaAltTitle;
