import { z } from "zod";

export const searchEmailsRequestDto = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type SearchEmailsRequestDto = z.infer<typeof searchEmailsRequestDto>;
