import { z } from "zod";

export const mangaSearchSchema = z.string().min(3);
