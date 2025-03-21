import { z } from "zod";

export const getBlogsByCategoryRequestDto = z.object({
  categoryName: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type GetBlogsByCategoryRequestDto = z.infer<
  typeof getBlogsByCategoryRequestDto
>;
