import { z } from "zod";

export const getBlogsByCategoryRequestDto = z.object({
  categoryName: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

export type GetBlogsByCategoryRequestDto = z.infer<
  typeof getBlogsByCategoryRequestDto
>;
