import { prisma } from "@/lib/prisma";
import { AddSubscriberDto } from "../dto/addSubscriber.dto";

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

  async getEmails() {
    return await prisma.subscriber.findMany();
  }
}
