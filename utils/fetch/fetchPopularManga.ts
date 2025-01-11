import { Browser } from "puppeteer";
import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import { cache } from "react";
import cleanUpMangaArray from "./clean-up-functions/cleanUpMangaArray";
import initBrowser from "../initBrowser";
import { unstable_cache } from "next/cache";
import { PopularMangaType } from "@/zod-schema/schema";

let numberToFetch = 0;
export const fetchPopularManga = cache((numberOfManga: number) => {
  numberToFetch = numberOfManga;
  return unstable_cache(
    async (numberOfManga: number) => {
      const url = "https://weebcentral.com/hot-updates";
      let browser: Browser;

      try {
        browser = await initBrowser();
        const data: PopularMangaType[] = [];
        const page = await browser.newPage();

        await page.setViewport({
          width: 1080,
          height: 768,
        });

        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto(url);

        const dataElements = await page.$$(
          "article.bg-base-100.hover\\:bg-base-300.md\\:relative.hidden.md\\:block.gap-4",
        );

        for (const element of dataElements) {
          if (data.length >= numberOfManga) {
            break;
          }
          const title = (await element.$eval(
            "a > div:nth-of-type(2) > div",
            (el) => el.textContent,
          )) as string;

          // image
          const image = await element.$eval(
            "a > div > picture > img",
            (el) => el.src,
          );

          // lastChapter
          const lastChapter = (await element.$eval(
            "a > div:nth-of-type(2) > div:nth-of-type(2)",
            (el) => el.textContent,
          )) as string;

          // chapterSlug
          const linkToChapterPage = (await element.$eval("a", (el) =>
            el.getAttribute("href"),
          )) as string;
          const chapterSlug = linkToChapterPage.split("/").pop()!;

          const parsedData: PopularMangaType = {
            title,
            image,
            lastChapter,
            chapterSlug,
          };
          data.push(parsedData);
        }

        await browser.close();
        return cleanUpMangaArray(data, "popular");
      } catch (error) {
        console.error(error);
      }
    },
    [`${FETCH_POPULAR_MANGA_TAG}${numberToFetch === 10 ? "Sample" : ""}`],
    {
      tags: [
        `${FETCH_POPULAR_MANGA_TAG}${numberToFetch === 10 ? "Sample" : ""}`,
      ],
      revalidate: 600,
    },
  )(numberOfManga);
});
