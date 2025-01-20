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

  async getRecentBlogs() {
    return await prisma.blog.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getBlogById(id: string) {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      throw new Error('Blog not found');
    }

    return blog;
  }

  async getTopBlogs() {
    return await prisma.blog.findMany({
      take: 6,
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          views: 'desc',
        },
      ],
    });
  }
}
