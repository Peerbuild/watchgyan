import { prisma } from "@/lib/prisma";
import { AddSubscriberDto } from "../dto/addSubscriber.dto";
import { GetEmailsRequestDto } from "../dto/getEmails.dto";

export class NewsletterService {
  async addSubscriber({ email }: AddSubscriberDto) {
    const isAlreadySubscribed = await prisma.subscriber.findUnique({
      where: {
        email,
      },
    });
    if (isAlreadySubscribed) {
      throw new Error("You are already subscribed");
    }

    return await prisma.subscriber.create({
      data: {
        email,
      },
    });
  }

  async getEmails(data?: GetEmailsRequestDto) {
    const emails = await prisma.subscriber.findMany({
      take: data?.limit,
      skip: data?.offset,
    });

    const totalEmails = await prisma.subscriber.count();

    return {
      emails,
      totalEmails,
    };
  }
}
