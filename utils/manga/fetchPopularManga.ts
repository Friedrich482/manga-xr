import {
  partialPopularMangaSchema,
  partialPopularMangaType,
  popularMangaType,
} from "@/zod-schema/schema";
import puppeteer from "puppeteer";

export async function fetchPopularManga() {
  let browser;
  try {
    browser = await puppeteer.launch();
    const data: partialPopularMangaType[] = [];
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
      const parsedData = partialPopularMangaSchema.parse({
        title,
        image,
        lastChapter,
        altTitle,
      });
      data.push(parsedData);
    }
    // genres
    const allMangaGenres: string[] = [];
    for (const element of data) {
      await page.goto(`https://mangasee123.com/manga/${element.altTitle}`);
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
    const finalData: popularMangaType[] = [];
    let i = 0;
    for (let element of data) {
      const genres = allMangaGenres[i];
      finalData.push({ ...element, genres });
      i++;
    }
    return finalData;
  } catch (error) {
    console.log(error);
  }
}
