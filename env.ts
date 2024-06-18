import { z } from "zod";

const envVarSchema = z.object({
  DATABASE_URL: z.string().min(3),
  AUTH: z.string().min(15),
});

export default envVarSchema;
