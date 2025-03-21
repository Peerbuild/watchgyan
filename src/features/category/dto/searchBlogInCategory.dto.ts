import { z } from "zod";

export const searchBlogInCategoryRequestDto = z.object({
  categoryId: z.string(),
  query: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type SearchBlogInCategoryRequestDto = z.infer<
  typeof searchBlogInCategoryRequestDto
>;
