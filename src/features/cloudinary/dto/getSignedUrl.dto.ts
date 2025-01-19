import { z } from 'zod';

export const getSignedUrlResponseDto = z.object({
  signature: z.string(),
  timestamp: z.number(),
  apiKey: z.string(),
  cloudName: z.string(),
});

export type GetSignedUrlResponseDto = z.infer<typeof getSignedUrlResponseDto>;
