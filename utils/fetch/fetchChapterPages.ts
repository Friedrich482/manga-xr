import { Browser } from "puppeteer";
import { FETCH_CHAPTER_PAGES_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import { cache } from "react";
import closeBrowser from "../closeBrowser";
import initBrowser from "../initBrowser";
import initPage from "../initPage";
import { unstable_cache } from "next/cache";

let id = "";
export const fetchChapterPages = cache((chapterSlug: string) => {
  id = `${chapterSlug}`;
  return unstable_cache(
    async (chapterSlug: string) => {
      let browser: Browser;
      try {
        browser = await initBrowser();
        const page = await initPage(browser);

        await page.goto(`${MAIN_URL}/chapters/${chapterSlug}`);
        const dataElementsSelector = "main > section:nth-of-type(3) > img";
        await page.waitForSelector(dataElementsSelector);

        const dataElements = await page.$$(dataElementsSelector);

        const data = await Promise.all(
          dataElements.map(
            async (element) => await element.evaluate((el) => el.src),
          ),
        );

        const mangaSlug = (
          await page.$eval("main > section > div > div > a", (el) => el.href)
        )
          .split("/")
          .at(-2)!;

        const currentChapterTitle = await page.$eval(
          "main > section > div > div > button > span",
          (el) => el.textContent!,
        );
        await closeBrowser(browser);
        return { images: data, mangaSlug, currentChapterTitle };
      } catch (error) {
        console.error(error);
      }
    },
    [`${FETCH_CHAPTER_PAGES_TAG}:${id}`],
    { tags: [`${FETCH_CHAPTER_PAGES_TAG}:${id}`] },
  )(chapterSlug);
});
