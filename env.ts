import { z } from "zod";

const envVarSchema = z.object({
  DATABASE_URL: z.string().min(3),
  SESSION_SECRET: z.string().min(10),
});

export default envVarSchema;
