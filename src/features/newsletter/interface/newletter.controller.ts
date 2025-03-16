"use server";

import { safeAction } from "@/lib/safeAction";
import { NewsletterService } from "./newsletter.service";
import { addSubscriberDto, AddSubscriberDto } from "../dto/addSubscriber.dto";

const newsletterService = new NewsletterService();

export const addSubscriber = safeAction(async (data: AddSubscriberDto) => {
  await newsletterService.addSubscriber(data);
}, addSubscriberDto);

export const getEmails = safeAction(async () => {
  return await newsletterService.getEmails();
});
