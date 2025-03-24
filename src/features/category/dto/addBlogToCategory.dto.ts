import { z } from "zod";

export const addBlogToCategoryRequestDto = z.object({
  blogId: z.string(),
  categoryId: z.string(),
});

export type AddBlogToCategoryRequestDto = z.infer<
  typeof addBlogToCategoryRequestDto
>;
