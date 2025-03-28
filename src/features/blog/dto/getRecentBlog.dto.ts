import { z } from "zod";

export const getRecentBlogRequestDto = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type GetRecentBlogRequest = z.infer<typeof getRecentBlogRequestDto>;
