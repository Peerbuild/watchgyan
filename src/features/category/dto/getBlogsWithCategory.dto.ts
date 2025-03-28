import { z } from "zod";

export const getBlogsWithCategoryRequestDto = z.object({
  categoryName: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type GetBlogsWithCategoryRequestDto = z.infer<
  typeof getBlogsWithCategoryRequestDto
>;
