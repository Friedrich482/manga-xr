import {
  PartialPopularMangaType,
  PopularMangaType,
  partialPopularMangaSchema,
} from "@/zod-schema/schema";
import { Browser } from "puppeteer";
import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import { cache } from "react";
import cleanUpMangaArray from "./clean-up-functions/cleanUpMangaArray";
import initBrowser from "../initBrowser";
import { unstable_cache } from "next/cache";

let numberToFetch = 0;
export const fetchPopularManga = cache((numberOfManga: number, url: string) => {
  numberToFetch = numberOfManga;
  return unstable_cache(
    async (numberOfManga: number, url: string) => {
      let browser: Browser;
      try {
        browser = await initBrowser();
        const data: PartialPopularMangaType[] = [];
        const page = await browser.newPage();

        await page.setViewport({
          width: 1080,
          height: 768,
        });

        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto(url);

        const dataElements = await page.$$(
          "div.MainContainer > div.row > div.col-lg-12 > div.Box > div.BoxBody > div.HotUpdateMobile > div.row > div.ng-scope",
        );

        for (const element of dataElements) {
          if (data.length >= numberOfManga) {
            break;
          }
          const title = await element.$eval(
            "a > div.row > div.Label > div.SeriesName > span",
            (el) => el.textContent,
          );

          // mangaSlug : extract the mangaSlug from the url

          const link = (await element.$eval("a", (el) =>
            el.getAttribute("href"),
          )) as string;

          const firstSlashIndex: number = link.indexOf("/");
          const secondSlashIndex: number = link.indexOf(
            "/",
            firstSlashIndex + 1,
          );

          const chapterIndex: number = link.indexOf("-chapter");
          const dashBeforeChapterIndex: number = link.lastIndexOf(
            "-",
            chapterIndex,
          );

          const mangaSlug: string = link.substring(
            secondSlashIndex + 1,
            dashBeforeChapterIndex,
          );
          // image
          const image = await element.$eval(
            "a > div.row > div.Image > img",
            (el) => el.src,
          );
          // lastChapter
          const lastChapter = await element.$eval(
            "a > div.row > div.Label > div.ChapterLabel",
            (el) => el.textContent,
          );
          const parsedData = partialPopularMangaSchema.parse({
            title,
            image,
            lastChapter,
            mangaSlug,
          });
          data.push(parsedData);
        }
        // genres
        const allMangaGenres: string[] = [];
        for (const element of data) {
          await page.goto(`${MAIN_URL}/manga/${element.mangaSlug}`);
          let elementGenres = (await page.$eval(
            "div.container > div.row > div > div > div > div.row > div.col-md-9 > ul > li:nth-child(4)",
            (el) => el.textContent,
          )) as string;
          if (elementGenres.indexOf("Author") !== -1) {
            elementGenres = (await page.$eval(
              "div.container > div.row > div > div > div > div.row > div.col-md-9 > ul > li:nth-child(5)",
              (el) => el.textContent,
            )) as string;
          }
          allMangaGenres.push(elementGenres);
        }
        const finalData: PopularMangaType[] = [];
        let i = 0;
        for (let element of data) {
          const genres = allMangaGenres[i];
          finalData.push({ ...element, genres });
          i++;
        }
        await browser.close();
        return cleanUpMangaArray(finalData, "popular");
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
  )(numberOfManga, url);
});
