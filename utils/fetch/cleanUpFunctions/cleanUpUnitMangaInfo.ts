import { PartialMangaUnitDataType } from "@/zod-schema/schema";

const cleanUpPartialMangaUnitInfo = (partialData: PartialMangaUnitDataType) => {
  const cleanedData: PartialMangaUnitDataType = { ...partialData };

  for (const [key, value] of Object.entries(partialData)) {
    if (typeof value === "string") {
      cleanedData[key as keyof PartialMangaUnitDataType] = value
        .replace(/\s+/g, " ")
        .trim();
    } else {
      cleanedData[key as keyof PartialMangaUnitDataType] = value;
    }
  }

  return cleanedData;
};
export default cleanUpPartialMangaUnitInfo;
