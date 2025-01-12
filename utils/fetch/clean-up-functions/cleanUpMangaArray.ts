import clean from "@/utils/clean";

const cleanUpMangaArray = (data: { [key: string]: string }[]) => {
  data.forEach((element) => {
    Object.entries(element).forEach(([key, value]) => {
      element[key] = clean(value);
    });
  });
};

export default cleanUpMangaArray;
