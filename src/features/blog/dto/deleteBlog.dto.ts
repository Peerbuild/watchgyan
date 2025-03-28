import { z } from "zod";

export const deleteBlogRequestDto = z.object({
  id: z.string(),
});

export type DeleteBlogRequest = z.infer<typeof deleteBlogRequestDto>;
