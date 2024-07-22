import puppeteer from "puppeteer";
import { unstable_cache } from "next/cache";
import { chapterImagesType } from "@/zod-schema/schema";
import getSeasonFromTitle from "../getSeasonFromTitle";
let id = "";
export const fetchChapterPages = unstable_cache(
  async (chapter: string, mangaTitle: string) => {
    id = `${mangaTitle}-${chapter}`;
    let browser;
    const { title, season } = getSeasonFromTitle(mangaTitle);
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      if (season && Number(season) > 1) {
        await page.goto(
          `https://mangasee123.com/read-online/${title}-${chapter}-index-${season}.html`,
        );
      } else {
        await page.goto(
          `https://mangasee123.com/read-online/${title}-${chapter}.html`,
        );
      }
      const dataElements = await page.$$(
        "div.MainContainer > div.ImageGallery > div.ng-scope > div.ng-scope",
      );

      const data: chapterImagesType[] = [];
      for (const element of dataElements) {
        const image = await element.$eval("img", (el) => el.src);
        data.push(image);
      }
      await browser.close();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  [`fetchChapterPages: ${id}`],
  { tags: [`fetchChapterPages: ${id}`] },
);
