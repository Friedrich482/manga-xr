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
    await page.goto("https://mangasee123.com/");

    const dataElements = await page.$$(
      "div.MainContainer > div.row > div.col-lg-12 > div.Box > div.BoxBody > div.HotUpdateMobile > div.row > div.ng-scope",
    );

    const data: popularMangaType[] = [];
    for (const element of dataElements) {
      if (data.length > 10) {
        break;
      }
      const title = await element.$eval(
        "a > div.row > div.Label > div.SeriesName > span",
        (el) => el.textContent,
      );

      // alTitle : extract the altTitle from the link

      const link = (await element.$eval("a", (el) =>
        el.getAttribute("href"),
      )) as string;

      const firstSlashIndex: number = link.indexOf("/");
      const secondSlashIndex: number = link.indexOf("/", firstSlashIndex + 1);

      const chapterIndex: number = link.indexOf("-chapter");
      const dashBeforeChapterIndex: number = link.lastIndexOf(
        "-",
        chapterIndex,
      );

      const altTitle: string = link.substring(
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
      const parsedData = popularMangaSchema.parse({
        title,
        image,
        lastChapter,
        altTitle,
      });
      data.push(parsedData);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
