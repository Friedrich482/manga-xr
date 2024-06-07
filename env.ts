import { z } from "zod";

const envVarSchema = z.object({
  DATABASE_URL: z.string().min(3),
});

export default envVarSchema;
