import { Browser } from "puppeteer";
import { FETCH_UNIT_MANGA_INFO_TAG } from "@/lib/cache-keys/unstable_cache";
import { MAIN_URL } from "@/lib/constants";
import { MangaUnitDataType } from "@/zod-schema/schema";
import { cache } from "react";
import cleanUpChaptersArray from "./clean-up-functions/cleanUpChaptersArray";
import closeBrowser from "../closeBrowser";
import initBrowser from "../initBrowser";
import initPage from "../initPage";
import sleep from "../sleep";
import { unstable_cache } from "next/cache";

let keyTitle = "";
export const fetchUnitMangaInfo = cache((mangaSlug: string) => {
  keyTitle = mangaSlug;
  return unstable_cache(
    async (mangaSlug: string) => {
      let browser: Browser;
      try {
        browser = await initBrowser();
        const page = await initPage(browser);

        await page.goto(`${MAIN_URL}/series/${mangaSlug}`, {
          waitUntil: "load",
        });

        const pageTitle = await page.title();
        if (pageTitle.includes("404")) {
          return 404;
        }

        const dataElements = await page.$("main > div > section");

        try {
          const showAllChaptersButtonSelector =
            "main > div > section > section:nth-of-type(2) > section:nth-of-type(3) > div > button";

          const showAllChaptersButton = await page.$(
            showAllChaptersButtonSelector,
          );

          if (showAllChaptersButton) {
            await page.click(showAllChaptersButtonSelector);
            await sleep(4000);
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {}

        const data: MangaUnitDataType = {
          image: "",
          title: "",
          author: "",
          genres: "",
          releaseDate: "",
          synopsis: "",
          latestUpdateDate: "",
          chapters: [],
        };

        if (!dataElements) {
          return null;
        }

        data.image = await dataElements.$eval(
          "section > section:nth-of-type(2) > picture > img",
          (el) => el.src,
        );

        data.title = (await dataElements.$eval(
          "section:nth-of-type(2) > h1",
          (el) => el.textContent,
        ))!;

        const metadataElements = await dataElements.$(
          "section > section:nth-of-type(3) > ul",
        );

        if (!metadataElements) {
          return null;
        }

        data.author = await (await metadataElements.$("li"))!.$$eval(
          "span",
          (elements) =>
            elements.reduce((acc, span) => acc + span.textContent?.trim(), ""),
        );

        data.genres = await (await metadataElements.$(
          "li:nth-of-type(2)",
        ))!.$$eval("span", (elements) =>
          elements.reduce((acc, span) => acc + span.textContent?.trim(), ""),
        );

        data.releaseDate = (await metadataElements.$eval(
          "li:nth-of-type(5) > span",
          (el) => el.textContent,
        ))!;

        data.synopsis = await dataElements.$eval(
          "section:nth-of-type(2) > section:nth-of-type(2) > ul > li",
          (elements) =>
            Array.from(elements.querySelectorAll("p")).reduce(
              (acc, p) => acc + p.textContent?.trim(),
              "",
            ),
        );

        data.latestUpdateDate = (await dataElements.$eval(
          "section:nth-of-type(2) > section:nth-of-type(3) > div > div > a > time",
          (el) => el.textContent,
        ))!;

        let chaptersNode = await dataElements.$$(
          "section:nth-of-type(2) > section:nth-of-type(3) > div  > div > a",
        );

        data.chapters = await Promise.all(
          chaptersNode.map(async (chapterNode) => {
            const chapterSlug = (await chapterNode.evaluate((el) => el.href))
              .split("/")
              .pop()!;

            const chapterTitle = (await chapterNode.$eval(
              "span:nth-of-type(2) > span",
              (el) => el.textContent,
            ))!;

            const chapterReleaseDate = (await chapterNode.$eval(
              "time",
              (el) => el.textContent,
            ))!;

            return {
              chapterTitle,
              chapterSlug,
              chapterReleaseDate,
            };
          }),
        );
        await closeBrowser(browser);

        cleanUpChaptersArray(data.chapters);
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    [`${FETCH_UNIT_MANGA_INFO_TAG}:${keyTitle}`],
    { tags: [`${FETCH_UNIT_MANGA_INFO_TAG}:${keyTitle}`], revalidate: 900 },
  )(mangaSlug);
});
