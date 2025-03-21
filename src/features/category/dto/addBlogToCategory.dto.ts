import { z } from "zod";

export const addBlogToCategoryRequestDto = z.object({
  blogId: z.string(),
  categoryId: z.string().nullish(),
});

export type AddBlogToCategoryRequestDto = z.infer<
  typeof addBlogToCategoryRequestDto
>;
