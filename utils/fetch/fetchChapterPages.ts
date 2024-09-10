import { ChapterImagesType } from "@/zod-schema/schema";
import { MAIN_URL } from "@/lib/constants";
import { cache } from "react";
import getSeasonFromTitle from "../getSeasonFromTitle";
import puppeteer from "puppeteer";
import { unstable_cache } from "next/cache";
let id = "";
export const fetchChapterPages = unstable_cache(
  cache(async (chapter: string, mangaTitle: string) => {
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
          `${MAIN_URL}/read-online/${title}-${chapter}-index-${season}.html`,
        );
      } else {
        await page.goto(`${MAIN_URL}/read-online/${title}-${chapter}.html`);
      }
      const dataElements = await page.$$(
        "div.MainContainer > div.ImageGallery > div.ng-scope > div.ng-scope",
      );

      const data: ChapterImagesType[] = [];
      for (const element of dataElements) {
        const image = await element.$eval("img", (el) => el.src);
        data.push(image);
      }
      await browser.close();
      return data;
    } catch (error) {
      console.log(error);
    }
  }),
  [`fetchChapterPages: ${id}`],
  { tags: [`fetchChapterPages: ${id}`] },
);
