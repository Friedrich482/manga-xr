import getMangaFromHistory from "@/lib/getMangasFromHistory";

const filterUniqueNames = (
  arrayOfObjects: Awaited<ReturnType<typeof getMangaFromHistory>>,
) => {
  const uniqueNames = new Set();

  return arrayOfObjects.filter((obj) => {
    if (obj.name && !uniqueNames.has(obj.name)) {
      uniqueNames.add(obj.name);
      return true;
    }
    return false;
  });
};

export default filterUniqueNames;
