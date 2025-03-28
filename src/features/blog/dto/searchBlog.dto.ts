import { z } from "zod";

export const searchBlogRequestDto = z.object({
  query: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type SearchBlogRequestDto = z.infer<typeof searchBlogRequestDto>;
