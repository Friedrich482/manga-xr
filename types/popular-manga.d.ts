export type MangaAttributes = Partial<{
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;
  titles: Partial<{
    en: string;
    en_jp: string;
    es_es: string;
    ja_jp: string;
  }>;
  canonicalTitle: string;
  abbreviatedTitles: string[];
  averageRating: string;
  ratingFrequencies: Record<string, string>;
  userCount: number;
  favoritesCount: number;
  startDate: string | null;
  endDate: string | null;
  nextRelease: string | null;
  popularityRank: number;
  ratingRank: number;
  ageRating: string;
  ageRatingGuide: string | null;
  subtype: string;
  status: string;
  tba: string | null;
  posterImage: Partial<{
    tiny: string;
    large: string;
    small: string;
    medium: string;
    original: string;
    meta: Partial<{
      dimensions: Partial<{
        tiny: { width: number; height: number };
        large: { width: number; height: number };
        small: { width: number; height: number };
        medium: { width: number; height: number };
      }>;
    }>;
  }>;
  coverImage: Partial<{
    tiny: string | null;
    large: string | null;
    small: string | null;
    original: string | null;
    meta: Partial<{
      dimensions: Partial<{
        tiny: { width: number; height: number };
        large: { width: number; height: number };
        small: { width: number; height: number };
      }>;
    }>;
  }>;
  chapterCount: number | null;
  volumeCount: number | null;
  serialization: string;
  mangaType: string;
}>;
