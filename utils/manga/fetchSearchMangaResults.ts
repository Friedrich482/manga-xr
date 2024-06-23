import puppeteer from "puppeteer";
import {
  searchResultMangaType,
  partialSearchMangaResultSchema,
  partialSearchMangaResultType,
} from "@/zod-schema/schema";
import { unstable_cache } from "next/cache";
let mangaEntered = "";
export const fetchSearchMangaResults = unstable_cache(
  async (manga: string) => {
    mangaEntered = manga;
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto(`https://mangasee123.com/search/?name=${manga}`);

      const dataElements = await page.$$(
        "div.MainContainer > div.row > div.col-12 > div.Box > div.BoxBody > div.row > div.col-md-8 > div.ng-scope > div.ng-scope",
      );

      const data: partialSearchMangaResultType[] = [];
      for (const element of dataElements) {
        if (data.length > 20) {
          break;
        }
        const title = await element.$eval(
          "div.row > div.col-md-10 > a",
          (el) => el.textContent,
        );
        // alt Title
        const link = (await element.$eval("div.row > div.col-md-10 > a", (el) =>
          el.getAttribute("href"),
        )) as string;
        const firstSlashIndex: number = link.indexOf("/");
        const secondSlashIndex: number = link.indexOf("/", firstSlashIndex + 1);
        const altTitle = link.substring(secondSlashIndex + 1, link.length);
        const image = await element.$eval(
          "div.row > div.col-md-2 > a > img",
          (el) => el.src,
        );
        let lastChapter = await element.$eval(
          "div.row > div.col-md-10 > div:nth-child(4) > a",
          (el) => el.textContent,
        );
        if (lastChapter?.indexOf("Chapter") === -1) {
          lastChapter = await element.$eval(
            "div.row > div.col-md-10 > div:nth-child(5) > a",
            (el) => el.textContent,
          );
        }
        const parsedObject = partialSearchMangaResultSchema.parse({
          title,
          altTitle,
          image,
        });
        data.push(parsedObject);
      }
      // last chapter : the data can be incorrect on this page, so the best solution is to navigate to the manga page and get the last chapter directly there
      const allLastChapters: string[] = [];
      for (const element of data) {
        await page.goto(`https://mangasee123.com/manga/${element.altTitle}`);
        const lastChapter = (await page.$eval(
          "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.list-group > a > span",
          (el) => el.textContent,
        )) as string;
        allLastChapters.push(lastChapter);
      }
      const finalData: searchResultMangaType[] = [];
      let i = 0;
      for (let element of data) {
        const lastChapter = allLastChapters[i];
        finalData.push({ ...element, lastChapter });
        i++;
      }
      return finalData;
    } catch (error) {
      console.log(error);
    }
  },
  [`searchResults:${mangaEntered}`],
  { tags: [`searchResults:${mangaEntered}`] },
);
