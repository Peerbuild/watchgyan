import { z } from "zod";

export const getEmailsRequestDto = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type GetEmailsRequestDto = z.infer<typeof getEmailsRequestDto>;
