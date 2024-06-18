import { popularMangaSchema, popularMangaType } from "@/zod-schema/schema";
import puppeteer from "puppeteer";

export async function fetchPopularManga() {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1080,
      height: 768,
    });

    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("https://mangakakalot.com/");

    const dataElements = await page.$$(
      "div.container > div.slide > div#owl-demo > div.owl-wrapper-outer > div.owl-wrapper > div.owl-item > div.item",
    );

    const data: popularMangaType[] = [];
    for (const element of dataElements) {
      if (data.length > 10) {
        break;
      }
      const title = await element.$eval(
        "div.slide-caption > h3 > a",
        (el) => el.textContent,
      );
      const image = await element.$eval("img", (el) => el.src);
      const lastChapter = await element.$eval(
        "div.slide-caption > a",
        (el) => el.textContent,
      );
      const parsedData = popularMangaSchema.parse({
        title,
        image,
        lastChapter,
      });

      data.push(parsedData);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
