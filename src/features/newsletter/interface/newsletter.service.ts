import { prisma } from "@/lib/prisma";
import { AddSubscriberDto } from "../dto/addSubscriber.dto";
import { GetEmailsRequestDto } from "../dto/getEmails.dto";
import { SearchEmailsRequestDto } from "../dto/SearchEmail.dto";

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
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalEmails = await prisma.subscriber.count();

    return {
      emails,
      totalEmails,
    };
  }

  async searchEmails(data: SearchEmailsRequestDto) {
    const emails = await prisma.subscriber.findMany({
      where: {
        email: {
          contains: data.query,
        },
      },
      take: data.limit ?? 10,
      skip: data.offset ?? 0,
    });

    const totalEmails = await prisma.subscriber.count({
      where: {
        email: {
          contains: data.query,
        },
      },
    });

    return {
      emails,
      totalEmails,
    };
  }
}
