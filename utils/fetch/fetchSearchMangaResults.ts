import puppeteer, { Page } from "puppeteer";
import {
  searchResultMangaType,
  partialSearchMangaResultSchema,
  partialSearchMangaResultType,
} from "@/zod-schema/schema";
import { unstable_cache } from "next/cache";

let mangaEntered = "";

// Function to configure the page to block unnecessary resources
const blockUnnecessaryRequests = async (page: Page) => {
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const blockedResources = ["image", "stylesheet", "font", "media"];
    if (blockedResources.includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

// Function to scrape manga details from the search results page
const scrapeSearchResults = async (page: Page, manga: string) => {
  await page.goto(`https://mangasee123.com/search/?name=${manga}`);
  const dataElements = await page.$$(
    "div.MainContainer > div.row > div.col-12 > div.Box > div.BoxBody > div.row > div.col-md-8 > div.ng-scope > div.ng-scope",
  );

  const data: partialSearchMangaResultType[] = [];
  for (const element of dataElements.slice(0, 20)) {
    // Limit to 20 results
    const title = await element.$eval(
      "div.row > div.col-md-10 > a",
      (el) => el.textContent,
    );

    const link = (await element.$eval("div.row > div.col-md-10 > a", (el) =>
      el.getAttribute("href"),
    )) as string;

    const firstSlashIndex: number = link.indexOf("/");
    const secondSlashIndex: number = link.indexOf("/", firstSlashIndex + 1);
    const altTitle = link.substring(secondSlashIndex + 1, link.length);

    const image = await element.$eval(
      "div.row > div.col-md-2 > a > img",
      (el) => el.src,
    );

    let lastChapter = await element.$eval(
      "div.row > div.col-md-10 > div:nth-child(4) > a",
      (el) => el.textContent,
    );

    if (lastChapter?.indexOf("Chapter") === -1) {
      lastChapter = await element.$eval(
        "div.row > div.col-md-10 > div:nth-child(5) > a",
        (el) => el.textContent,
      );
    }

    const parsedObject = partialSearchMangaResultSchema.parse({
      title,
      altTitle,
      image,
    });

    data.push(parsedObject);
  }

  return data;
};

// Function to scrape the last chapter from the manga's detail page
const scrapeLastChapters = async (
  page: Page,
  data: partialSearchMangaResultType[],
) => {
  const allLastChapters: string[] = [];

  for (const element of data) {
    await page.goto(`https://mangasee123.com/manga/${element.altTitle}`);
    const lastChapter = (await page.$eval(
      "div.MainContainer > div.row > div.col-md-12 > div.Box > div.BoxBody > div.list-group > a > span",
      (el) => el.textContent,
    )) as string;

    allLastChapters.push(lastChapter);
  }

  return allLastChapters;
};

export const fetchSearchMangaResults = unstable_cache(
  async (manga: string) => {
    mangaEntered = manga;
    let browser;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await blockUnnecessaryRequests(page);

      await page.setViewport({
        width: 1080,
        height: 768,
      });

      page.setDefaultNavigationTimeout(2 * 60 * 1000);

      const data = await scrapeSearchResults(page, manga);
      const allLastChapters = await scrapeLastChapters(page, data);

      const finalData: searchResultMangaType[] = data.map((element, index) => ({
        ...element,
        lastChapter: allLastChapters[index],
      }));

      return finalData;
    } catch (error) {
      console.error("Error in fetchSearchMangaResults:", error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  },
  [`searchResults:${mangaEntered}`],
  { tags: [`searchResults:${mangaEntered}`], revalidate: 3600 },
);
