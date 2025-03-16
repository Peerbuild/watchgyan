import { z } from "zod";
import { createBlogRequestDto } from "./createBlog.dto";

export const updateBlogRequestDto = createBlogRequestDto.partial().extend({
  id: z.string(),
  isPublished: z.boolean().optional(),
  isDraft: z.boolean().optional(),
});

export type UpdateBlogRequest = z.infer<typeof updateBlogRequestDto>;
