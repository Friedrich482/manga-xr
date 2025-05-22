import { FETCH_SEARCH_MANGA_RESULTS_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import cleanUpMangaArray from "./clean-up-functions/cleanUpMangaArray";
import closeBrowser from "../closeBrowser";
import initBrowser from "../initBrowser";
import { unstable_cache } from "next/cache";

let mangaEntered = "";

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
      await page.goto(`${MAIN_URL}/search?text=${manga}`, {
        waitUntil: "domcontentloaded",
        timeout: 0,
      });

      const moreResultsButtonSelector =
        "main > div > section:nth-of-type(4) > button";

      try {
        const moreResultsButton = await page.$(moreResultsButtonSelector);

        if (moreResultsButton) {
          await page.click("main > div > section:nth-of-type(4) > button");
        }
      } catch {}

      const dataElementsSelector =
        "main > div > section:nth-of-type(4) > article";
      await page.waitForSelector(dataElementsSelector, { timeout: 5000 });

      const dataElements = await page.$$(dataElementsSelector);

      const data = await Promise.all(
        dataElements.slice(0, 60).map(async (element) => {
          const title = (await element.$eval(
            "section:nth-of-type(2) > div > span > a",
            (el) => el.textContent,
          ))!;

          const link = (await element.$eval("section > a", (el) =>
            el.getAttribute("href"),
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

          return {
            title,
            mangaSlug,
            image,
            yearOfRelease,
          };
        }),
      );

      await closeBrowser(browser);

      cleanUpMangaArray(data);
      return data;
    } catch {
      return [];
    } finally {
    }
  },
  [`${FETCH_SEARCH_MANGA_RESULTS_TAG}:${mangaEntered}`],
  {
    tags: [`${FETCH_SEARCH_MANGA_RESULTS_TAG}:${mangaEntered}`],
    revalidate: 900,
  },
);
