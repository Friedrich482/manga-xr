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
      await page.goto(MAIN_URL);

      const dataElements = await page.$$(
        "div.MainContainer > div.row > div.col-lg-8 > div.Box > div.BoxBody > div.row > div.col-md-6",
      );

      const data: LatestUpdateType[] = [];
      for (const element of dataElements) {
        if (data.length > 20) {
          break;
        }
        const title = await element.$eval(
          "span > div > div.Label > a > div.SeriesName > span",
          (el) => el.textContent,
        );
        // alt Title
        const link = (await element.$eval("span > div > div.Image > a", (el) =>
          el.getAttribute("href"),
        )) as string;
        const firstSlashIndex: number = link.indexOf("/");
        const secondSlashIndex: number = link.indexOf("/", firstSlashIndex + 1);
        const mangaSlug = link.substring(secondSlashIndex + 1, link.length);
        const image = await element.$eval(
          "span > div > div.Image > a > img",
          (el) => el.src,
        );
        const lastChapter = await element.$eval(
          "span > div > div.Label > a > div.ChapterLabel",
          (el) => el.textContent,
        );
        const parsedObject = latestUpdateSchema.parse({
          title,
          mangaSlug,
          lastChapter,
          image,
        });
        data.push(parsedObject);
      }
      await browser.close();
      return cleanUpMangaArray(data);
    } catch (error) {
      console.error(error);
    }
  },
  [FETCH_LATEST_UPDATES_TAG],
  { tags: [FETCH_LATEST_UPDATES_TAG], revalidate: 600 },
);
