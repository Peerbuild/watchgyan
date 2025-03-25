import { z } from "zod";
import { createBlogRequestDto } from "./createBlog.dto";

export const publishBlogRequestDto = createBlogRequestDto.partial().extend({
  id: z.string(),
});

export type PublishBlogRequest = z.infer<typeof publishBlogRequestDto>;
