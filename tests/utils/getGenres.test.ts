import { describe, expect, it } from "vitest";
import getGenres from "@/utils/getGenres";

describe("getGenres", () => {
  it("should return an array with at most 9 genres from a string passed in parameter", () => {
    expect(
      getGenres("Action,Adventure,Drama,Fantasy,Mystery,Shounen,Supernatural"),
    ).toStrictEqual([
      "Action",
      "Adventure",
      "Drama",
      "Fantasy",
      "Mystery",
      "Shounen",
      "Supernatural",
    ]);
    expect(getGenres("Action,Horror,Sci-fi")).toStrictEqual([
      "Action",
      "Horror",
      "Sci-fi",
    ]);
  });

  it("should return the first 9 genres if there are more", () => {
    expect(
      getGenres(
        "Action,Adventure,Fantasy,Harem,Isekai,Romance,Seinen,Thriller,Tragedy,Drama",
      ),
    ).toStrictEqual([
      "Action",
      "Adventure",
      "Fantasy",
      "Harem",
      "Isekai",
      "Romance",
      "Seinen",
      "Thriller",
      "Tragedy",
    ]);
  });

  it("should return an array with an empty string if there is no genres", () => {
    expect(getGenres("")).toStrictEqual([""]);
  });
});
