import { prisma } from "@/lib/prisma";
import { GetBlogsWithCategoryRequestDto } from "../dto/getBlogsWithCategory.dto";
import { AddBlogToCategoryRequestDto } from "../dto/addBlogToCategory.dto";
import { SearchBlogInCategoryRequestDto } from "../dto/searchBlogInCategory.dto";
import { GetBlogsByCategoryRequestDto } from "../dto/getBlogByCategory.dto";

export class CategoryService {
  async getCategories() {
    return await prisma.category.findMany();
  }

  async getBlogsByCategory(data: GetBlogsByCategoryRequestDto) {
    return await prisma.blog.findMany({
      where: {
        isPublished: true,
        category: {
          name: data.categoryName,
        },
      },

      take: data.limit || 10,
    });
  }

  async getBlogsWithCategory({
    categoryName,
    limit,
    offset,
  }: GetBlogsWithCategoryRequestDto) {
    const blogsWithCategory = await prisma.blog.findMany({
      where: {
        isPublished: true,
        category: {
          name: categoryName,
        },
      },
    });

    const remainingBlogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        category: null,
      },
      take: (limit ?? 10) - blogsWithCategory.length,
      skip: offset ?? 0,
    });

    const totalBlogs = await prisma.blog.count();

    if (offset === 0) {
      return {
        blogs: [...blogsWithCategory, ...remainingBlogs],
        totalBlogs,
      };
    }

    return {
      blogs: remainingBlogs,
      totalBlogs,
    };
  }

  async addBlogToCategory(data: AddBlogToCategoryRequestDto) {
    const { blogId, categoryId } = data;

    if (!categoryId) {
      return await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          category: {
            disconnect: true,
          },
        },
      });
    }

    return await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async searchBlogsInCategory(data: SearchBlogInCategoryRequestDto) {
    const { categoryId, query: searchQuery } = data;

    const query = {
      where: {
        OR: [
          {
            category: null,
          },
          {
            categoryId: categoryId,
          },
        ],
        title: {
          contains: searchQuery,
          mode: "insensitive" as const,
        },
      },

      take: data.limit || 10,
      skip: data.offset || 0,
    };

    const blogs = await prisma.blog.findMany(query);

    const totalBlogs = await prisma.blog.count(query);

    return {
      blogs,
      totalBlogs,
    };
  }
}
