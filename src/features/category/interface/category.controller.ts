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

const categoryService = new CategoryService();

export const getCategories = safeAction(async () => {
  return categoryService.getCategories();
});

export const getBlogsByCategory = safeAction(async (categoryName: string) => {
  return categoryService.getBlogsByCategory(categoryName);
});

export const getBlogsWithCategory = safeAction(
  async (data: GetBlogsWithCategoryRequestDto) => {
    return categoryService.getBlogsWithCategory(data);
  },
  getBlogsWithCategoryRequestDto,
);

export const addBlogToCategory = safeAction(
  async (data: AddBlogToCategoryRequestDto) => {
    return categoryService.addBlogToCategory(data);
  },
  addBlogToCategoryRequestDto,
);

export const searchBlogsInCategory = safeAction(
  async (data: SearchBlogInCategoryRequestDto) => {
    return categoryService.searchBlogsInCategory(data);
  },
  searchBlogInCategoryRequestDto,
);
