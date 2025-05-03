import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email().min(2, { message: 'Email must be 2 characters' }),
  });
