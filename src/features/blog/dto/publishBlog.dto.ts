import { z } from "zod";

export const publishBlogRequestDto = z.object({
  id: z.string(),
});

export type PublishBlogRequest = z.infer<typeof publishBlogRequestDto>;
