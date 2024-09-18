import {
  MangaListType,
  PartialMangaListType,
  partialMangaListSchema,
} from "@/zod-schema/schema";
import { FETCH_LIST_FROM_LETTER_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import cleanUpMangaArray from "./cleanUpFunctions/cleanUpMangaArray";
import puppeteer from "puppeteer";
import { unstable_cache } from "next/cache";

let letter = "";
export const fetchListFromLetter = unstable_cache(
  async (text: string) => {
    letter = text;
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto(`${MAIN_URL}/directory/`);

      if (text !== "NUMBERS") {
        // we need to click on the button first
        const buttons = await page.$$(
          "div.container > div.row > div.col-lg-8 > div.Box > div.BoxBody > div.btn-group > button.btn",
        );

        for (const button of buttons) {
          const buttonText = await button.evaluate(
            (el) => el.textContent || "",
          );
          if (buttonText === text) {
            await button.click();
            break;
          }
        }
        //   we clicked on the right button
      }

      const dataElements = await page.$$(
        "div.MainContainer > div.row > div.col-lg-8 > div.Box > div.BoxBody > div.ng-scope > div.ng-scope > div.ng-scope",
      );

      const data: PartialMangaListType[] = [];
      for (const element of dataElements) {
        if (data.length > 30) {
          break;
        }
        const title = await element.$eval("a", (el) => el.textContent);
        // alt Title
        const link = (await element.$eval("a", (el) =>
          el.getAttribute("href"),
        )) as string;
        const firstSlashIndex: number = link.indexOf("/");
        const secondSlashIndex: number = link.indexOf("/", firstSlashIndex + 1);
        const mangaSlug = link.substring(secondSlashIndex + 1, link.length);

        const parsedObject = partialMangaListSchema.parse({
          title,
          mangaSlug,
        });

        data.push(parsedObject);
      }
      // image and lastChapter : these two data can't be accessed directly on the list page, so it is better to navigate directly to the page of each manga
      const allLastChapters: string[] = [];
      const allImages: string[] = [];
      for (const element of data) {
        await page.goto(`${MAIN_URL}/manga/${element.mangaSlug}`);
        const lastChapter = (await page.$eval(
          "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.list-group > a > span",
          (el) => el.textContent,
        )) as string;
        allLastChapters.push(lastChapter);
        const image = await page.$eval(
          "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.row > div.col-md-3 > img",
          (el) => el.src,
        );
        allImages.push(image);
      }
      const finalData: MangaListType[] = [];
      let i = 0;
      for (let element of data) {
        const lastChapter = allLastChapters[i];
        const image = allImages[i];
        finalData.push({ ...element, lastChapter, image });
        i++;
      }

      await browser.close();
      return cleanUpMangaArray(finalData);
    } catch (error) {
      console.error(error);
    }
  },
  [`${FETCH_LIST_FROM_LETTER_TAG}:${letter}`],
  { tags: [`${FETCH_LIST_FROM_LETTER_TAG}:${letter}`], revalidate: 7200 },
);
