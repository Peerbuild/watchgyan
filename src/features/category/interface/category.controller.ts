"use server";
import { safeAction } from "@/lib/safeAction";
import { CategoryService } from "./category.service";
import {
  getBlogsWithCategoryRequestDto,
  GetBlogsWithCategoryRequestDto,
} from "../dto/getBlogsWithCategory.dto";
import {
  addBlogToCategoryRequestDto,
  AddBlogToCategoryRequestDto,
} from "../dto/addBlogToCategory.dto";
import {
  searchBlogInCategoryRequestDto,
  SearchBlogInCategoryRequestDto,
} from "../dto/searchBlogInCategory.dto";
import {
  getBlogsByCategoryRequestDto,
  GetBlogsByCategoryRequestDto,
} from "../dto/getBlogByCategory.dto";
import { revalidatePath } from "next/cache";

const categoryService = new CategoryService();

export const getCategories = await safeAction(async () => {
  return categoryService.getCategories();
});
export const getBlogsByCategory = await safeAction(
  async (data: GetBlogsByCategoryRequestDto) => {
    return categoryService.getBlogsByCategory(data);
  },
  getBlogsByCategoryRequestDto,
  undefined,
  true,
);

export const getBlogsWithCategory = await safeAction(
  async (data: GetBlogsWithCategoryRequestDto) => {
    return categoryService.getBlogsWithCategory(data);
  },
  getBlogsWithCategoryRequestDto,
);

export const addBlogToCategory = await safeAction(
  async (data: AddBlogToCategoryRequestDto) => {
    const blog = await categoryService.addBlogToCategory(data);
    revalidatePath("/blog");
    revalidatePath("/");
    return blog;
  },
  addBlogToCategoryRequestDto,
);

export const searchBlogsInCategory = await safeAction(
  async (data: SearchBlogInCategoryRequestDto) => {
    return categoryService.searchBlogsInCategory(data);
  },
  searchBlogInCategoryRequestDto,
);
