import { z } from "zod";

export const getDraftBlogsRequestDto = z.object({
  limit: z.number().optional(),
});

export type GetDraftBlogsRequest = z.infer<typeof getDraftBlogsRequestDto>;
