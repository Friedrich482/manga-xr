import { ISearch, IMangaResult } from "@consumet/extensions";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";

class newMangaDex extends MangaDex {
  async fetchPopular(
    page: number = 1,
    limit: number = 20,
  ): Promise<ISearch<IMangaResult>> {
    if (page <= 0) throw new Error("Page number must be greater than 0");
    if (limit > 100) throw new Error("Limit must be less than or equal to 100");
    if (limit * (page - 1) >= 10000) throw new Error("Not enough results");

    try {
      const res = await this.client.get(
        `${this.getApiUrl()}/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&limit=${limit}&offset=${limit * (page - 1)}`,
      );

      if (res.data.result === "ok") {
        const results: ISearch<IMangaResult> = {
          currentPage: page,
          results: res.data.data.map((manga: any) => ({
            id: manga.id,
            title: Object.values(manga.attributes.title)[0] as string,
            altTitles: manga.attributes.altTitles,
            description: Object.values(
              manga.attributes.description,
            )[0] as string,
            status: manga.attributes.status,
            releaseDate: manga.attributes.year,
            contentRating: manga.attributes.contentRating,
            lastVolume: manga.attributes.lastVolume,
            lastChapter: manga.attributes.lastChapter,
          })),
        };

        return results;
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      throw new Error(
        `Failed to fetch popular manga: ${(err as Error).message}`,
      );
    }
  }

  // Assuming there's a method to get the apiUrl in the base class, you can use it
  private getApiUrl(): string {
    // Use the original method to get the apiUrl if it exists
    return (this as any).apiUrl;
  }
}

// Export the class for future use
export default newMangaDex;
