import { describe, expect, it } from "vitest";
import { PartialMangaUnitDataType } from "@/zod-schema/schema";
import cleanUpPartialMangaUnitInfo from "@/utils/fetch/clean-up-functions/cleanUpUnitMangaInfo";

describe("cleanUpMangaUnitInfo", () => {
  it("should return the", () => {
    const partialData: PartialMangaUnitDataType = {
      title: "\n\t\n\t\n\n\nCooking With Wild Game\n\n\n\t\n\n\n\t",
      synopsis:
        "\n\n\n\t\t\n\n\nThe protagonist is Tsurumi Asuta, a seventeen year old, second year high schooler. He was working as an apprentice cook at 'Tsurumi-ya,' a restaurant managed by his father. One day a fire broke out in 'Tsurumi-ya' for the sake of his father's cherished knife (Santoku Houchou -- japanese kind) he ran inside to retrieve it and thus met his end. Before he knew it he awoke to an unknown environment. He was then attacked by a beast resembling a boar but a girl named 'Ai=FÃ¢' from the 'People of Morihen' saved him. It was then that he realized he was really in different world.\n\t\n\n\n\n\t\n\n\t",
      author: "\n\n\n\t\nEDA, Kochimo\n\t\n\t\n\t",
      image: "\n\nimg1\t\n",
      genres: "\n\n\nGenre: Comedy, Slice of Life\t\t\n",
      latestUpdateDate: "\n\t\n\n\t\nYesterday at 10:48 AM\n\n\t\n",
      releaseDate: "\t\n2017\n\n\n\t",
    };
    const cleanUpMangaUnitInfo: PartialMangaUnitDataType = {
      title: "Cooking With Wild Game",
      synopsis:
        "The protagonist is Tsurumi Asuta, a seventeen year old, second year high schooler. He was working as an apprentice cook at 'Tsurumi-ya,' a restaurant managed by his father. One day a fire broke out in 'Tsurumi-ya' for the sake of his father's cherished knife (Santoku Houchou -- japanese kind) he ran inside to retrieve it and thus met his end. Before he knew it he awoke to an unknown environment. He was then attacked by a beast resembling a boar but a girl named 'Ai=FÃ¢' from the 'People of Morihen' saved him. It was then that he realized he was really in different world.",
      author: "EDA, Kochimo",
      image: "img1",
      genres: "Genre: Comedy, Slice of Life",
      latestUpdateDate: "Yesterday at 10:48 AM",
      releaseDate: "2017",
    };

    expect(cleanUpPartialMangaUnitInfo(partialData)).toStrictEqual(
      cleanUpMangaUnitInfo,
    );
  });
});
