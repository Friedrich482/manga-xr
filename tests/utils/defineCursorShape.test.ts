import { ChapterPagesDisposition, ReadingDirection } from "@/zod-schema/schema";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import defineCursorShape from "@/utils/defineCursorShape";

const originalInnerWidth = window.innerWidth;
const originalInnerHeight = window.innerHeight;
const interval = 200;
const images = ["img1", "img2", "img3", "img4"];

// ! Long Strip
describe("defineCursorShape for Long Strip", () => {
  const ChapterPagesDisposition: ChapterPagesDisposition = "Long Strip";
  beforeEach(() => {
    // Mock window.innerWidth and window.innerHeight
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 768,
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore original values after each test
    Object.defineProperty(window, "innerWidth", {
      value: originalInnerWidth,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: originalInnerHeight,
      configurable: true,
    });
  });

  it("should return cursor up", () => {
    const e = {
      clientX: 100,
      clientY: originalInnerHeight / 2 - interval,
    } as MouseEvent;

    expect(defineCursorShape(e, ChapterPagesDisposition, 0, images)).toBe(
      "cursor-up",
    );
  });

  it("should return cursor down", () => {
    const e = {
      clientX: 100,
      clientY: originalInnerHeight / 2,
    } as MouseEvent;

    expect(defineCursorShape(e, ChapterPagesDisposition, 0, images)).toBe(
      "cursor-down",
    );
  });

  it("should return cursor down", () => {
    const e = {
      clientX: 100,
      clientY: originalInnerHeight / 2 + interval,
    } as MouseEvent;

    expect(defineCursorShape(e, ChapterPagesDisposition, 0, images)).toBe(
      "cursor-down",
    );
  });
});

// ! Single Page

describe("defineCursorShape for Single Page", () => {
  const chapterPagesDisposition: ChapterPagesDisposition = "Single Page";
  beforeEach(() => {
    // Mock window.innerWidth and window.innerHeight
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 768,
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore original values after each test
    Object.defineProperty(window, "innerWidth", {
      value: originalInnerWidth,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: originalInnerHeight,
      configurable: true,
    });
  });

  describe("From left to right", () => {
    const readingDirection: ReadingDirection = "From left to right";
    it("should return cursor left if we are not on the first image", () => {
      const e = {
        clientX: originalInnerWidth / 2 - interval,
        clientY: 400,
      } as MouseEvent;

      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          1,
          images,
          readingDirection,
        ),
      ).toBe("cursor-left");
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          0,
          images,
          readingDirection,
        ),
      ).toBe("cursor-default");
    });

    it("should return cursor right if we are not on the last image", () => {
      const e = {
        clientX: originalInnerWidth / 2 + interval,
        clientY: 400,
      } as MouseEvent;
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          1,
          images,
          readingDirection,
        ),
      ).toBe("cursor-right");
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          images.length - 1,
          images,
          readingDirection,
        ),
      ).toBe("cursor-default");
    });
  });

  describe("From right to left", () => {
    const readingDirection: ReadingDirection = "From right to left";
    it("should return cursor left if we are not on the last image", () => {
      const e = {
        clientX: originalInnerWidth / 2 - interval,
        clientY: 400,
      } as MouseEvent;
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          1,
          images,
          readingDirection,
        ),
      ).toBe("cursor-left");
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          images.length - 1,
          images,
          readingDirection,
        ),
      ).toBe("cursor-default");
    });
    it("should return cursor right if we are not on the first image", () => {
      const e = {
        clientX: originalInnerWidth / 2 + interval,
        clientY: 400,
      } as MouseEvent;
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          1,
          images,
          readingDirection,
        ),
      ).toBe("cursor-right");
      expect(
        defineCursorShape(
          e,
          chapterPagesDisposition,
          0,
          images,
          readingDirection,
        ),
      ).toBe("cursor-default");
    });
  });
});
