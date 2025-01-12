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
      const url = `${MAIN_URL}/hot-updates`;
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
        const dataElementsDate = await page.$$(
          "article.bg-base-100.hover\\:bg-base-300.flex.gap-4.md\\:hidden",
        );
        for (const element of dataElements) {
          const elementIndex = dataElements.indexOf(element);
          if (data.length >= numberOfManga) {
            break;
          }
          const title = (await element.$eval(
            "a > div:nth-of-type(2) > div",
            (el) => el.textContent,
          ))!;

          // image
          const image = await element.$eval(
            "a > div > picture > img",
            (el) => el.src,
          );

          // lastChapter
          const lastChapter = (await element.$eval(
            "a > div:nth-of-type(2) > div:nth-of-type(2)",
            (el) => el.textContent,
          ))!;

          // chapterSlug
          const linkToChapterPage = (await element.$eval("a", (el) =>
            el.getAttribute("href"),
          ))!;
          const chapterSlug = linkToChapterPage.split("/").pop()!;

          //  release date
          const releaseDate = (await dataElementsDate[elementIndex].$eval(
            "div:nth-of-type(2) > a > div:nth-of-type(3) > time",
            (el) => el.textContent,
          ))!;

          const parsedData: PopularMangaType = {
            title,
            image,
            lastChapter,
            chapterSlug,
            releaseDate,
          };
          data.push(parsedData);
        }

        await browser.close();
        cleanUpMangaArray(data);
        return data;
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
