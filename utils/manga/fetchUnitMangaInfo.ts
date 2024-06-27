import puppeteer from "puppeteer";
import { unstable_cache } from "next/cache";
import { mangaUnitDataType } from "@/zod-schema/schema";
let title = "";
export const fetchUnitMangaInfo = unstable_cache(
  async (altTitle: string) => {
    title = altTitle;
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto(`https://mangasee123.com/manga/${altTitle}`);
      const data = await page.$(
        "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.row",
      );
      let partialData = {
        image: "",
        title: "",
        author: "",
        genres: "",
        releaseDate: "",
        synopsys: "",
        latestUpdateDate: "",
      };
      if (data) {
        const image = await data.$eval("div.col-md-3 > img", (el) => el.src);
        const title = (await data.$eval(
          "div.col-md-9 > ul > li",
          (el) => el.textContent,
        )) as string;

        const listElements = await page.$$(
          "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.row > div.col-md-9 > ul > li",
        );
        if (listElements) {
          for (const element of listElements) {
            const potentialData = (await element.evaluate((el) =>
              el.textContent?.trim(),
            )) as string;
            if (potentialData.includes("Author(s):")) {
              const author = potentialData.substring(
                potentialData.indexOf("Author(s):") + "Author(s):".length + 2,
              );
              partialData = { ...partialData, author };
            } else if (potentialData.includes("Genre(s):")) {
              const genres = potentialData.substring(
                potentialData.indexOf("Genre(s):") + "Genre(s):".length + 2,
              );
              partialData = { ...partialData, genres };
            } else if (potentialData.includes("Released:")) {
              const releaseDate = potentialData.substring(
                potentialData.indexOf("Released:") + "Released:".length + 1,
              );
              partialData = { ...partialData, releaseDate };
            } else if (potentialData.includes("Description:")) {
              const synopsys = potentialData.substring(
                potentialData.indexOf("Description:") +
                  "Description:".length +
                  1,
              );
              partialData = { ...partialData, synopsys };
            }
          }
        }
        partialData = {
          ...partialData,
          image,
          title,
        };
      }
      const chaptersList = await page.$(
        "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.list-group",
      );
      const chapters: string[] = [];
      if (chaptersList) {
        const latestUpdateDate = (await chaptersList.$eval(
          "a > span.float-right",
          (el) => el.textContent,
        )) as string;
        //   click on the "show all chapters button if it exists"

        await page.click(
          "body > div.container.MainContainer > div > div > div > div > div.list-group.top-10.bottom-5.ng-scope > div",
        );
        const chaptersLink = await chaptersList.$$("a");
        for (const chapter of chaptersLink) {
          const chapterTitle = (await chapter.$eval(
            "span",
            (el) => el.textContent,
          )) as string;
          chapters.push(chapterTitle);
        }
        partialData = { ...partialData, latestUpdateDate };
      }
      const finalData: mangaUnitDataType = { ...partialData, chapters };
      console.log(finalData);
      return finalData;
    } catch (error) {
      console.log(error);
    }
  },
  [`fetchUnitMangaInfo:${title}`],
  { tags: [`fetchUnitMangaInfo:${title}`] },
);
