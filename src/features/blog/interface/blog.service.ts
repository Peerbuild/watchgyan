import { prisma } from '@/lib/prisma';
import { CreateBlogRequest } from '../dto/createBlog.dto';

export class BlogService {
  async createBlog(dto: CreateBlogRequest) {
    const slug = dto.title.toLowerCase().replace(/ /g, '-');

    console.log({
      ...dto,
      slug,
    });

    const blog = await prisma.blog.create({
      data: {
        ...dto,
        slug,
      },
    });

    return `Blog created with id: ${blog.id}`;
  }
}
