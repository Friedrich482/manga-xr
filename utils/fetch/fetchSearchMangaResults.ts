import { SearchResultMangaType } from "@/zod-schema/schema";
import { FETCH_SEARCH_MANGA_RESULTS_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import cleanUpMangaArray from "./clean-up-functions/cleanUpMangaArray";
import initBrowser from "../initBrowser";
import { unstable_cache } from "next/cache";

let mangaEntered = "";
const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

export const fetchSearchMangaResults = unstable_cache(
  async (manga: string) => {
    mangaEntered = manga;
    let browser;
    try {
      browser = await initBrowser();

      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);

      await page.goto(`${MAIN_URL}/search`);
      const inputSelector =
        "main > div > section > form > section > label > input:nth-of-type(2)";
      await page.focus(inputSelector);
      await page.type(inputSelector, manga);
      await page.keyboard.press("Enter");

      await page.waitForSelector(
        "main > div > section:nth-of-type(4) > article",
      );
      const moreResultsButtonSelector =
        "main > div > section:nth-of-type(4) > button";
      try {
        const moreResultsButton = await page.$(moreResultsButtonSelector);
        await sleep(1000);

        if (moreResultsButton) {
          await page.click("main > div > section:nth-of-type(4) > button");
        }
      } catch (error) {}

      await sleep(1000);

      const dataElements = await page.$$(
        "main > div > section:nth-of-type(4) > article",
      );
      const data: SearchResultMangaType[] = [];
      for (const element of dataElements.slice(0, 60)) {
        const title = (await element.$eval(
          "section:nth-of-type(2) > div > a",
          (el) => el.textContent,
        ))!;

        const link = (await element.$eval(
          "section:nth-of-type(2) > div > a",
          (el) => el.getAttribute("href"),
        ))!;

        const mangaSlug = link.split("/").at(-2)!;

        const image = await element.$eval(
          "section > a > article > picture > img",
          (el) => el.src,
        );

        const yearOfRelease = (await element.$eval(
          "section:nth-of-type(2) > div:nth-of-type(2) > span",
          (el) => el.textContent,
        ))!;

        const parsedObject: SearchResultMangaType = {
          title,
          mangaSlug,
          image,
          yearOfRelease,
        };

        data.push(parsedObject);
      }

      cleanUpMangaArray(data);
      return data;
    } catch (error) {
      console.error("Error in fetchSearchMangaResults:", error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },
  [`${FETCH_SEARCH_MANGA_RESULTS_TAG}:${mangaEntered}`],
  {
    tags: [`${FETCH_SEARCH_MANGA_RESULTS_TAG}:${mangaEntered}`],
    revalidate: 900,
  },
);
