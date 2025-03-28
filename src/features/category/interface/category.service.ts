import { prisma } from "@/lib/prisma";
import { GetBlogsWithCategoryRequestDto } from "../dto/getBlogsWithCategory.dto";
import { AddBlogToCategoryRequestDto } from "../dto/addBlogToCategory.dto";
import { SearchBlogInCategoryRequestDto } from "../dto/searchBlogInCategory.dto";
import { GetBlogsByCategoryRequestDto } from "../dto/getBlogByCategory.dto";
import { RemoveBlogFromCategoryRequestDto } from "../dto/removeBlogFromCategory.dto";

export class CategoryService {
  async getCategories() {
    return await prisma.category.findMany();
  }

  async getBlogsByCategory(data: GetBlogsByCategoryRequestDto) {
    return await prisma.blog.findMany({
      where: {
        isPublished: true,
        categories: {
          some: {
            name: {
              contains: data.categoryName,
            },
          },
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
        categories: {
          some: {
            name: {
              contains: categoryName,
            },
          },
        },
      },
    });

    const remainingBlogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        categories: {
          none: {
            name: {
              contains: categoryName,
            },
          },
        },
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

    return await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async removeBlogFromCategory(data: RemoveBlogFromCategoryRequestDto) {
    const { blogId, categoryId } = data;

    return await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        categories: {
          disconnect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async searchBlogsInCategory(data: SearchBlogInCategoryRequestDto) {
    const { query: searchQuery } = data;

    const query = {
      where: {
        isPublished: true,
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
