import { z } from "zod";

export const addSubscriberDto = z.object({
  email: z.string().email(),
});

export type AddSubscriberDto = z.infer<typeof addSubscriberDto>;
