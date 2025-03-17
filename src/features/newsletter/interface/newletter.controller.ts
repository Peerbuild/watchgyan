"use server";

import { safeAction } from "@/lib/safeAction";
import { NewsletterService } from "./newsletter.service";
import { addSubscriberDto, AddSubscriberDto } from "../dto/addSubscriber.dto";
import { GetEmailsRequestDto, getEmailsRequestDto } from "../dto/getEmails.dto";

const newsletterService = new NewsletterService();

export const addSubscriber = safeAction(async (data: AddSubscriberDto) => {
  await newsletterService.addSubscriber(data);
}, addSubscriberDto);

export const getEmails = safeAction(async (data?: GetEmailsRequestDto) => {
  return await newsletterService.getEmails(data);
}, getEmailsRequestDto);
