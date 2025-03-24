import { z } from "zod";

export const removeBlogFromCategoryRequestDto = z.object({
  categoryId: z.string(),
  blogId: z.string(),
});

export type RemoveBlogFromCategoryRequestDto = z.infer<
  typeof removeBlogFromCategoryRequestDto
>;
