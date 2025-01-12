import { LatestUpdateType, latestUpdateSchema } from "@/zod-schema/schema";
import { Browser } from "puppeteer";
import { FETCH_LATEST_UPDATES_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import cleanUpMangaArray from "./clean-up-functions/cleanUpMangaArray";
import initBrowser from "../initBrowser";
import { unstable_cache } from "next/cache";

export const fetchLatestUpdates = unstable_cache(
  async () => {
    let browser: Browser;
    try {
      browser = await initBrowser();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto("https://weebcentral.com/");

      const dataElements = await page.$$(
        "article.bg-base-100.hover\\:bg-base-300.flex.items-center.gap-4",
      );
      const data: LatestUpdateType[] = [];
      for (const element of dataElements) {
        if (data.length > 20) {
          break;
        }
        const title = (await element.$eval(
          "a:nth-of-type(2) > div > span",
          (el) => el.textContent,
        ))!;

        // chapterSlug
        const link = (await element.$eval(
          "a:nth-of-type(2)",
          (el) => el.href,
        ))!;

        const chapterSlug = link.split("/").pop()!;

        const image = await element.$eval("a > picture > img", (el) => el.src);

        const lastChapter = (await element.$eval(
          "a:nth-of-type(2) > div:nth-of-type(2) > span",
          (el) => el.textContent,
        ))!;
        const parsedObject: LatestUpdateType = {
          title,
          chapterSlug,
          lastChapter,
          image,
        };
        data.push(parsedObject);
      }
      await browser.close();
      cleanUpMangaArray(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  [FETCH_LATEST_UPDATES_TAG],
  { tags: [FETCH_LATEST_UPDATES_TAG], revalidate: 600 },
);
