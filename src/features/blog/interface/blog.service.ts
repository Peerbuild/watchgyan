import { prisma } from "@/lib/prisma";
import { CreateBlogRequest } from "../dto/createBlog.dto";
import { GetDraftBlogsRequest } from "../dto/getDraftBlog.dto";
import { PublishBlogRequest } from "../dto/publishBlog.dto";
import { DeleteBlogRequest } from "../dto/deleteBlog.dto";
import { UpdateBlogRequest } from "../dto/updateBlog.dto";
import { GetRecentBlogRequest } from "../dto/getRecentBlog.dto";
import { SearchBlogRequestDto } from "../dto/searchBlog.dto";

export class BlogService {
  async createBlog(dto: CreateBlogRequest) {
    const slug = dto.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

    const blog = await prisma.blog.create({
      data: {
        ...dto,
        slug,
      },
    });

    return blog;
  }

  async publishBlog({ id, ...data }: PublishBlogRequest) {
    const slug = data.title
      ? data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
      : null;

    return await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(slug && { slug }),
        isPublished: true,
        isDraft: false,
      },
    });
  }

  async getAllBlogs(data?: GetRecentBlogRequest) {
    const blogs = await prisma.blog.findMany({
      where: {
        isDraft: false,
      },
      take: data?.limit || 10,
      skip: data?.offset || 0,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalBlogs = await prisma.blog.count({
      where: {
        isDraft: false,
      },
    });

    return {
      blogs,
      totalBlogs,
    };
  }

  async getRecentBlogs(data?: GetRecentBlogRequest) {
    const blogs = await prisma.blog.findMany({
      where: {
        isDraft: false,
        isPublished: true,
      },
      take: data?.limit || 10,
      skip: data?.offset || 0,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalBlogs = await prisma.blog.count({
      where: {
        isDraft: false,
      },
    });

    return {
      blogs,
      totalBlogs,
    };
  }

  async getBlogById(id: string) {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  }

  async getTopBlogs() {
    return await prisma.blog.findMany({
      where: {
        isPublished: true,
      },
      take: 6,
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          views: "desc",
        },
      ],
    });
  }

  async getDraftBlogs(data?: GetDraftBlogsRequest) {
    const blogs = await prisma.blog.findMany({
      where: {
        isDraft: true,
        isPublished: false,
      },
      ...(data?.limit && { take: data.limit }),
      orderBy: {
        createdAt: "desc",
      },
    });

    return blogs;
  }

  async updateBlog({ id, ...data }: UpdateBlogRequest) {
    const isBlogExists = await prisma.blog.findUnique({
      where: {
        id,
      },
    });
    if (!isBlogExists) {
      throw new Error("Blog not found");
    }

    const slug = data.title
      ? data.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
      : isBlogExists.slug;

    return await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...data,
        slug,
      },
    });
  }

  async deleteBlog(data: DeleteBlogRequest) {
    const isBlogExists = await prisma.blog.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!isBlogExists) {
      throw new Error("Blog not found");
    }

    return await prisma.blog.delete({
      where: {
        id: data.id,
      },
    });
  }

  async searchBlogs(data: SearchBlogRequestDto) {
    const blogs = await prisma.blog.findMany({
      where: {
        title: {
          contains: data.query,
          mode: "insensitive",
        },
      },

      take: data.limit || 10,
      skip: data.offset || 0,
    });

    const totalBlogs = await prisma.blog.count({
      where: {
        title: {
          contains: data.query,
          mode: "insensitive",
        },
      },
    });

    return {
      blogs,
      totalBlogs,
    };
  }
}
